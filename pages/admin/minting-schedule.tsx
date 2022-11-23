import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
  Modal,
  initialSWRData,
} from 'components/global';
import {
  LogHead,
  LogItem,
  EditSchedule,
  EditCategory,
} from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

type ModalDataType = {
  type: 'New' | 'Edit' | 'Category';
  id: number;
};

const limit = 10;

const startDay = new Date('2000-01-01').getTime();
const endDay = new Date('2024-01-01').getTime();

const fetcher: Fetcher<
  PagedSWRDataType<Minting.ScheduleType[]>,
  string
> = async (url: string) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      const values: Minting.ScheduleType[][] = Object.values(data.data);
      let schedules: Minting.ScheduleType[] = [];
      values.forEach((value) => {
        schedules = schedules.concat(value);
      });
      return { data: schedules, total: data.page.total };
    }
    return initialSWRData;
  } catch (e) {
    alert(
      `Error while fetching minting schedules. ERR: ${
        (e as AxiosError).response?.status
      }`
    );
    return initialSWRData;
  }
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<ModalDataType>({
    type: 'New',
    id: -1,
  });
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAppSelector(({ account }) => account);

  useEffect(() => {
    if (!isAdmin) {
      router.back();
    }
  }, []);

  const { data: schedules = initialSWRData, mutate } = useSWR(
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

  if (isAdmin)
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
                {schedules.data.map((schedule) => (
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
              {schedules.total > 0 && (
                <PageMoveBtns
                  setCurPage={setCurPage}
                  totalPage={schedules.total}
                  curPage={curPage}
                />
              )}
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
  return <div>: P</div>;
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
