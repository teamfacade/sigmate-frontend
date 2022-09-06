import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MouseEventHandler,
} from 'react';
// eslint-disable-next-line import/no-named-default
import { default as MyCalendar, OnChangeDateCallback } from 'react-calendar';
import { CSSTransition } from 'react-transition-group';
import convertDate from 'lib/global/convertDate';
import { getMintingSchedules } from 'lib/user/calendar';
import CalendarModal from 'containers/user/calendar/CalendarModal';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { ScheduleThumbnail } from 'components/user/calendar';

export default function Calendar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [schedules, setSchedules] = useState<Minting.SchedulesType>(
    getMintingSchedules()
  );
  const [showModal, setShowModal] = useState(false);
  const [calDate, setCalDate] = useState('');
  const [mintingKey, setMintingKey] = useState('');
  const ModalRef = useRef<HTMLDivElement>(null);

  const onChange: OnChangeDateCallback = useCallback((value: Date) => {
    setShowModal(true);
    setCalDate(convertDate(value, 'MonthDDYYYY', '.'));
    setMintingKey(convertDate(value, 'key', '.'));
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <BasicWrapper maxWidth="880px">
        <SectionWrapper header="Calendar" marginBottom="25px">
          <MyCalendar
            onChange={onChange}
            locale="en-US"
            maxDetail="month"
            minDetail="month"
            className="my-calendar"
            // eslint-disable-next-line react/no-unstable-nested-components
            tileContent={({ date }) => {
              const formattedDate = convertDate(date, 'key', '.');
              if (
                Object.keys(schedules).find((when) => when === formattedDate)
              ) {
                return (
                  <ScheduleThumbnail
                    length={schedules[formattedDate].length}
                    firstName={schedules[formattedDate][0].name}
                  />
                );
              }
              return <div />;
            }}
          />
        </SectionWrapper>
      </BasicWrapper>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <CalendarModal
          date={calDate}
          mintings={schedules[mintingKey]}
          onClick={onClick}
          ref={ModalRef}
        />
      </CSSTransition>
    </>
  );
}
