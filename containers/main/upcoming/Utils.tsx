import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import convertDate from 'lib/global/convertDate';
import { Search } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  today: Date;
  showCalendar: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: OnChangeDateCallback;
};

export default memo(function Utils({
  today,
  showCalendar,
  onClick,
  onChange,
}: PropsType) {
  return (
    <Wrapper>
      <DateBtn onClick={onClick}>
        {convertDate(today, 'MonthDDYYYY', ' ')}
      </DateBtn>
      {showCalendar && (
        <CalendarWrapper>
          <Calendar
            onChange={onChange}
            locale="en-US"
            maxDetail="month"
            minDetail="month"
            className="upcoming"
            value={today}
          />
        </CalendarWrapper>
      )}
      <Search white />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const DateBtn = styled.button`
  height: 40px;
  padding: 0 23px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.logoColor};
  color: #ffffff;
  font-size: 20px;
  font-weight: 900;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 400px;
  z-index: 1;
`;
