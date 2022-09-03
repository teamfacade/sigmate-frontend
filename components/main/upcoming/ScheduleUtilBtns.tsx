import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import styles from '../../../styles/styleLib';

type PropsType = {
  mintPageUrl?: string;
};

export default memo(function ScheduleUtilBtns({ mintPageUrl }: PropsType) {
  return (
    <BtnWrapper>
      <AddCalenderBtn>Add to calender</AddCalenderBtn>
      <MintBtn disabled={mintPageUrl === undefined}>
        <Link href={mintPageUrl || '/main'}>
          <a>Mint</a>
        </Link>
      </MintBtn>
    </BtnWrapper>
  );
});

const BtnWrapper = styled.div`
  display: flex;
  margin-top: 13px;

  button {
    border-radius: 8px;
    border: none;
    font-size: 15px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;

    a {
      font-size: 15px;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
    }
  }
`;

const AddCalenderBtn = styled.button`
  padding: 7px 30px;
  margin: 0;
  background-color: #e9f0ff;
  color: ${styles.colors.emphColor};
  white-space: nowrap;
`;

const MintBtn = styled.button`
  padding: 7px 38px;
  margin: 0 0 0 10px;
  background-color: ${styles.colors.emphColor};
  a {
    color: #ffffff;
  }
`;
