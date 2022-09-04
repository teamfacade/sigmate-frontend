import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { OnChangeDateCallback } from 'react-calendar';
import { getUpcomingSchedules } from 'lib/main/upcoming/getScheduleData';
import { Utils, Schedules } from 'containers/main/upcoming';
import { PageMoveBtns, Modal } from 'components/global';
import { RegisterBtn } from 'components/main/forum/main';
import { ScheduleDetail } from 'components/main/upcoming';

const total = 13;

export default function Upcoming({
  schedules,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [today, setToday] = useState<Date>(new Date(Date.now()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState(-1);

  const ModalRef = useRef<HTMLDivElement>(null);

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
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 15 categories from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 15
        }`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 15 categories from 0th`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 15 categories from ${(curPage - 1 - 1) * 15}th `);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 15 categories from ${curPage * 15}th`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 15 categories from ((total / 15) * 10)th`);
          setCurPage(
            Math.floor(Number.parseInt((total / 15).toFixed(), 10)) + 1
          );
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
        <Utils
          today={today}
          showCalendar={showCalendar}
          onClick={onClickDateBtn}
          onChange={onChangeDate}
        />
        <Schedules schedules={schedules} onClickSchedule={onClickSchedule} />
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
          {showModal !== -1 && (
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const schedules = getUpcomingSchedules();
  return {
    props: {
      schedules,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 30 minutes
    revalidate: 1800, // In seconds
  };
}

const Wrapper = styled.div`
  max-width: 1060px;
  margin: auto;
`;
