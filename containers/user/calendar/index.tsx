import { useState, useCallback, MouseEventHandler } from 'react';
// eslint-disable-next-line import/no-named-default
import { default as MyCalendar, OnChangeDateCallback } from 'react-calendar';
import { CSSTransition } from 'react-transition-group';
import convertDate from 'hooks/convertDate';
import { BasicWrapper, SectionWrapper } from 'components/global';
import CalendarModal from './CalendarModal';

export default function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [calDate, setCalDate] = useState<Date>(new Date());

  const onChange: OnChangeDateCallback = useCallback((value: Date) => {
    setShowModal(true);
    setCalDate(value);
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowModal(false);
  }, []);

  // @todo 해당 월 민팅 일정 데이터 가져오기 -> CalendarModal에 해당 날짜 민팅 일정만 넣어주기

  return (
    <>
      <BasicWrapper maxWidth="880px">
        <SectionWrapper header="Calendar" marginBottom="25px">
          <MyCalendar
            onChange={onChange}
            locale="en-US"
            maxDetail="month"
            minDetail="month"
          />
        </SectionWrapper>
      </BasicWrapper>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
      >
        <CalendarModal date={convertDate(calDate)} onClick={onClick} />
      </CSSTransition>
    </>
  );
}
