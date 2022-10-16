import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
  Modal,
} from 'components/global';
import {
  LogHead,
  LogItem,
  EditSchedule,
  EditCategory,
} from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';

type ModalDataType = {
  type: 'New' | 'Edit' | 'Category';
  id: number;
};

let total = 4242;
const limit = 10;

const startDay = new Date('2000-01-01').getTime();
const endDay = new Date('2024-01-01').getTime();

const fetcher: Fetcher<Minting.ScheduleType[], string> = async (
  url: string
) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    total = data.page.total;
    const values: Minting.ScheduleType[][] = Object.values(data.data);
    let schedules: Minting.ScheduleType[] = [];
    values.forEach((value) => {
      schedules = schedules.concat(value);
    });
    return schedules;
  }
  return [];
};

export const categoriesFetcher: Fetcher<
  CollectionCategoryType[],
  string
> = async (url: string) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    return data.categories || [];
  }
  alert(
    `Error while fetching collection categories: ERR ${status}.\r\nPlease reload the page.`
  );
  return [];
};

export default function MintingSchedule() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<ModalDataType>({
    type: 'New',
    id: -1,
  });
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: schedules, mutate } = useSWR(
    `/calendar/minting?start=${startDay}&end=${endDay}&limit=${limit}&page=${curPage}`,
    fetcher
  );

  const { data: categories } = useSWR(
    `/wiki/collection/category`,
    categoriesFetcher
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name, dataset } = e.currentTarget;

      switch (name) {
        case 'new':
          setShowModal({
            type: 'New',
            id: 0,
          });
          break;
        case 'edit':
          setShowModal({
            type: 'Edit',
            id: Number.parseInt(dataset?.id || '0', 10),
          });
          break;
        case 'delete':
          dispatch(
            AuthRequiredAxios({
              method: 'DELETE',
              url: `/calendar/minting/${dataset?.id}`,
            })
          ).then(async (action: any) => {
            if (action.payload.status === 200) await mutate();
            else
              alert(
                `Error while deleting the schedule. ERR: ${action.payload.status}`
              );
          });
          break;
        case 'categories':
          setShowModal({
            type: 'Category',
            id: 0,
          });
          break;
        default:
          break;
      }
    },
    [mutate]
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> =
    useCallback(async () => {
      await mutate();
      setShowModal({ type: 'New', id: -1 });
    }, [mutate]);

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 referral logs from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 10
        }th log`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from ${(curPage - 1 - 1) * 10}th log`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ((total / 10) * 10)th log`);
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <>
      <Wrapper>
        <BasicWrapper>
          <SectionWrapper header="Minting schedule">
            <div>
              <input type="date" />
              <span>Category</span>
              <select name="category">
                {categories?.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <Search />
            <CreateBtnsWrapper>
              <CreateNewBtn name="new" onClick={onClick}>
                Add new
              </CreateNewBtn>
              <CreateNewBtn name="categories" onClick={onClick}>
                Edit Categories
              </CreateNewBtn>
            </CreateBtnsWrapper>
          </SectionWrapper>
        </BasicWrapper>
        <BasicWrapper>
          <SectionWrapper header="Search result">
            <LogTable gap="8vw">
              <LogHead />
              {schedules?.map((schedule) => (
                <LogItem
                  key={schedule.id}
                  id={schedule.id}
                  name={schedule.name}
                  mintingTime={new Date(schedule.mintingTime).toISOString()}
                  tier={schedule.tier}
                  category={schedule.collection.category?.name || ''}
                  onClick={onClick}
                />
              ))}
            </LogTable>
            <PageMoveBtns
              onClickPageNumBtn={onClickPageNumBtn}
              onClickPageMoveBtn={onClickPageMoveBtn}
              totalPage={total}
              curPage={curPage}
            />
          </SectionWrapper>
        </BasicWrapper>
      </Wrapper>
      <CSSTransition
        in={showModal.id >= 0}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          {showModal.type !== 'Category' ? (
            <EditSchedule type={showModal.type} id={showModal.id} />
          ) : (
            <EditCategory />
          )}
        </Modal>
      </CSSTransition>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;

const CreateBtnsWrapper = styled.div`
  position: absolute;
  top: -10px;
  right: 0;
  display: flex;
`;

const CreateNewBtn = styled.button`
  ${BlueBtnStyle};

  & + & {
    margin-left: 12px;
  }
`;
