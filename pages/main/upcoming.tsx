import {
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
  useMemo,
} from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { OnChangeDateCallback } from 'react-calendar';
import Axios from 'lib/global/axiosInstance';
import convertDate from 'lib/global/convertDate';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { Utils, Schedules } from 'containers/main/upcoming';
import { PageMoveBtns, Modal, BasicWrapper } from 'components/global';
import { RegisterBtn } from 'components/main/forum/main';
import { ScheduleDetail } from 'components/main/upcoming';

const limit = 15;
let total = 0;

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

export default function Upcoming() {
  const dispatch = useAppDispatch();
  const [today, setToday] = useState<Date>(new Date(Date.now()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState(-1);

  const lastPage = useMemo(
    () => Math.floor(Number.parseInt((total / limit).toFixed(), 10)) + 1,
    [total]
  );
  const todayMidnight = useMemo(
    () => new Date(`${convertDate(today, 'dateInput', '-')} 00:00`).getTime(),
    [today]
  );

  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: schedules } = useSWR(
    `/calendar/minting?start=${todayMidnight}&end=${
      todayMidnight + 86399999
    }&limit=${limit}&page=${curPage}`,
    fetcher
  );

  const onClickDateBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowCalendar((current) => !current),
    []
  );

  const onChangeDate: OnChangeDateCallback = useCallback((value: Date) => {
    setToday(value);
    setShowCalendar(false);
  }, []);

  const onClickSchedule: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setShowModal(Number.parseInt(e.currentTarget.dataset.id || '-1', 10));
    },
    []
  );

  const onClickBackground: MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      setShowModal(-1);
    }, []);

  const AddToCalendar: (id: string, subscribed: boolean) => void = useCallback(
    async (id: string, subscribed: boolean) => {
      const action: any = await dispatch(
        AuthRequiredAxios(
          subscribed
            ? {
                method: 'DELETE',
                url: `/calendar/my/minting/${Number.parseInt(id, 10)}`,
              }
            : {
                method: 'POST',
                url: '/calendar/my/minting',
                data: {
                  type: 'minting',
                  id: Number.parseInt(id, 10),
                },
              }
        )
      );
      if (action.payload.status === 200)
        alert(
          `${
            subscribed
              ? 'Unsubscribed the minting schedule.'
              : 'Added to my calendar.'
          }`
        );
      else
        alert('Error while adding event to my calendar.\r\nPlease try again.');
    },
    []
  );

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          setCurPage(1);
          break;
        case 'Prev':
          setCurPage((cur) => Math.max(1, cur - 1));
          break;
        case 'Next':
          setCurPage((cur) => Math.min(lastPage, cur + 1));
          break;
        case 'ToLast':
          setCurPage(lastPage);
          break;
        default:
          break;
      }
    },
    [curPage, lastPage]
  );
  return (
    <>
      <Wrapper>
        <Utils
          today={today}
          showCalendar={showCalendar}
          onClick={onClickDateBtn}
          onChange={onChangeDate}
        />
        {schedules && schedules.length > 0 ? (
          <Schedules
            schedules={schedules}
            onClickSchedule={onClickSchedule}
            AddToCalendar={AddToCalendar}
          />
        ) : (
          <BasicWrapper>
            <LargeText>No mintings today ;(</LargeText>
          </BasicWrapper>
        )}
        <PageMoveBtns
          totalPage={total}
          curPage={curPage}
          onClickPageMoveBtn={onClickPageMoveBtn}
          onClickPageNumBtn={onClickPageNumBtn}
        />
        <RegisterBtn />
      </Wrapper>
      <CSSTransition
        in={showModal !== -1}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal ref={ModalRef} onMouseDown={onClickBackground}>
          {showModal !== -1 && schedules && (
            <ScheduleDetail
              schedule={
                schedules[
                  schedules.findIndex((schedule) => schedule.id === showModal)
                ]
              }
            />
          )}
        </Modal>
      </CSSTransition>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const LargeText = styled.p`
  margin: auto;
  text-align: center;
  color: #96b8d7;
  font-family: 'Claris Sans', sans-serif;
  font-size: 50px;
  font-weight: 200;
  line-height: 150%;
`;
