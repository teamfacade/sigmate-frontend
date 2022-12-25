import { memo, MouseEventHandler } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import convertDate from 'lib/global/convertDate';
import { Triangle } from 'public/Icons/main/upcoming';
import styles, { BlueBtnStyle } from 'styles/styleLib';

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
        <div>
          <span>{convertDate(today, 'MonthDDYYYY', ' ')}</span>
          <Triangle />
        </div>
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
      {/* <Search white /> */}
      <Link href="/user" passHref>
        <a>
          <MvToCalBtn>Move to my calendar</MvToCalBtn>
        </a>
      </Link>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DateBtn = styled.button`
  height: 40px;
  padding: 0 23px;
  margin: 0 18px 18px 0;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.logoColor};
  color: #ffffff;
  font-size: 20px;
  font-weight: 900;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  div {
    display: flex;

    span {
      white-space: nowrap;
    }

    svg {
      transform: translate(5px, 5px);
    }
  }
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 400px;
  z-index: 2;
`;

const MvToCalBtn = styled.button`
  ${BlueBtnStyle};
  flex: 0 1 auto;
  padding: 11px 30px;
  margin-bottom: 18px;
  font-weight: 600;
  white-space: nowrap;
`;
