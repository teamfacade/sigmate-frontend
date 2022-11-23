import { useMemo, memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import convertDate from 'lib/global/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  username: string;
  displayName: string;
  createdAt: string;
};

// @todo username에서 프로필 페이지로의 링크 필요
export default memo(function LogItem({
  id,
  username,
  displayName,
  createdAt,
}: PropsType) {
  return (
    <tbody>
      <tr>
        <td>{id}</td>
        <ProfileLink>
          <Link href={`/main/profile/${username}`}>
            <a>{displayName}</a>
          </Link>
        </ProfileLink>
        <td>{createdAt}</td>
      </tr>
    </tbody>
  );
});

const ProfileLink = styled.td`
  a {
    color: ${styles.colors.emphColor};
  }
`;
