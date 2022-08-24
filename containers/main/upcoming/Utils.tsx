import { memo, useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import convertDate from 'hooks/convertDate';
import { Search } from 'components/global';
import styles from 'styles/styleLib';

export default memo(function Utils() {
  const [today, setToday] = useState<Date>(new Date(Date.now()));

  return (
    <Wrapper>
      <DateBtn>{convertDate(today, 'MonthDDYYYY', ' ')}</DateBtn>
      <Search white />
    </Wrapper>
  );
});

const Wrapper = styled.div`
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

  :hover {
    background-color: ${darken(0.3, styles.colors.logoColor)};
  }
`;
