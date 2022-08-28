import { useMemo, memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import convertDate from 'lib/global/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  timestamp: number;
  username: string;
  amount: string;
};

// @todo username에서 프로필 페이지로의 링크 필요
export default memo(function LogItem({
  timestamp,
  username,
  amount,
}: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'time', undefined),
    [timestamp]
  );

  return (
    <tbody>
      <tr>
        <td>{time}</td>
        <ProfileLink>
          <Link href={`/main/profile/${username}`}>
            <a>{username}</a>
          </Link>
        </ProfileLink>
        <td>{`${amount} points`}</td>
      </tr>
    </tbody>
  );
});

const ProfileLink = styled.td`
  a {
    color: ${styles.colors.emphColor};
  }
`;
