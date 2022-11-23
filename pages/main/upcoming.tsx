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
// import { DateTime } from 'luxon';
import Axios from 'lib/global/axiosInstance';
import convertDate, { changeToUTCinMilli } from 'lib/global/convertDate';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { Utils, Schedules } from 'containers/main/upcoming';
import { PageMoveBtns, Modal, BasicWrapper } from 'components/global';
// import { RegisterBtn } from 'components/main/forum/main';
import { ScheduleDetail } from 'components/main/upcoming';

const limit = 15;

const fetcher: Fetcher<
  PagedSWRDataType<Minting.ScheduleType[]>,
  string
> = async (url: string) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    const values: Minting.ScheduleType[][] = Object.values(data.data);
    let schedules: Minting.ScheduleType[] = [];
    values.forEach((value) => {
      schedules = schedules.concat(value);
    });
    return { data: schedules, total: data.page.total };
  }
  return { data: [], total: 0 };
};

export default function Upcoming() {
  const dispatch = useAppDispatch();
  const [today, setToday] = useState<Date>(new Date(Date.now()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState(-1);

  const todayMidnight = useMemo(
    () =>
      changeToUTCinMilli(
        new Date(`${convertDate(today, 'dateInput', '-')} 00:00`)
      ),
    [today]
  );

  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: schedules } = useSWR(
    `/calendar/minting?start=${todayMidnight}&end=${
      todayMidnight + 86400000
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

  const onClickBackground: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = useCallback(() => {
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
            subscribed ? 'Removed from my calendar.' : 'Added to my calendar.'
          }`
        );
      else
        alert('Error while adding event to my calendar.\r\nPlease try again.');
    },
    []
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
        {schedules?.data && schedules?.data.length > 0 ? (
          <Schedules
            schedules={schedules.data}
            onClickSchedule={onClickSchedule}
            AddToCalendar={AddToCalendar}
          />
        ) : (
          <BasicWrapper>
            <LargeText>No mintings today ;(</LargeText>
          </BasicWrapper>
        )}
        {(schedules?.total && schedules.total > 0) === true && (
          <PageMoveBtns
            totalPage={schedules?.total as number}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        )}
        {/* <RegisterBtn /> */}
      </Wrapper>
      <CSSTransition
        in={showModal !== -1}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal ref={ModalRef} onMouseDown={onClickBackground}>
          {showModal !== -1 && schedules?.data && (
            <ScheduleDetail
              schedule={
                schedules.data[
                  schedules.data.findIndex(
                    (schedule) => schedule.id === showModal
                  )
                ]
              }
              onClickClose={onClickBackground}
            />
          )}
          {showModal === -1 && <div style={{ height: '537px' }} />}
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
