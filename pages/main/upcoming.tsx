import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { OnChangeDateCallback } from 'react-calendar';
import Axios from 'lib/global/axiosInstance';
import { Utils, Schedules } from 'containers/main/upcoming';
import { PageMoveBtns, Modal } from 'components/global';
import { RegisterBtn } from 'components/main/forum/main';
import { ScheduleDetail } from 'components/main/upcoming';

const fetcher: Fetcher<Minting.ScheduleType[], string> = async (
  url: string
) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    const values: Minting.ScheduleType[][] = Object.values(data);
    const schedules: Minting.ScheduleType[] = [];
    values.forEach((value) => schedules.concat(value));
    return schedules;
  } return [];
};

const limit = 15;
const total = 13;
const lastPage = Math.floor(Number.parseInt((total / limit).toFixed(), 10)) + 1;

export default function Upcoming() {
  const [today, setToday] = useState<Date>(new Date(Date.now()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState(-1);

  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: schedules } = useSWR(
    `/calendar/minting?start=${today.getTime()}&end=${today.getTime()}&limit=${limit}&page=${curPage}`,
    fetcher
  );

  const onClickDateBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowCalendar((current) => !current),
    []
  );

  const onChangeDate: OnChangeDateCallback = useCallback((value: Date) => {
    setShowCalendar(false);
    setToday(value);
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
        {schedules && (
          <Schedules schedules={schedules} onClickSchedule={onClickSchedule} />
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
