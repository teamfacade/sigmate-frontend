import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { EditDate } from 'components/main/Layout';
import styles from 'styles/styleLib';

type PropsType = {
  timestamp: number;
  title: string;
};

export default memo(function RecentEdit({ timestamp, title }: PropsType) {
  return (
    <Edit>
      <EditDate timestamp={timestamp} />
      <Link href={`https://namu.wiki/w/${title}`}>
        <a>
          <p>{title}</p>
        </a>
      </Link>
    </Edit>
  );
});

const Edit = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 14px 10px;
  background-color: #fafbfc;
  border-radius: 8px;

  :not(:first-child) {
    margin-top: 7px;
  }

  p {
    display: inline-block;
    margin: 0;
    color: ${styles.colors.logColor};
    font-size: 14px;
    font-family: 'Inter', sans-serif;
  }

  a p {
    margin-left: 35px;
    color: ${styles.colors.emphColor};
  }
`;
