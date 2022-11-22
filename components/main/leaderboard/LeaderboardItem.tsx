import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  rank: number;
  userName: string;
  displayName?: string;
  referral: number;
  forum: number;
  editCount: number;
  total: number;
};

export default memo(function LeaderboardItem({
  rank,
  userName,
  displayName,
  referral,
  forum,
  editCount,
  total,
}: PropsType) {
  return (
    <tbody>
      <tr>
        <td>
          <ColorBgText rank={rank}>{rank}</ColorBgText>
        </td>
        <td>
          <Link href={`/main/profile/${userName}`}>
            <a>
              <ColoredText rank={rank}>{displayName || userName}</ColoredText>
            </a>
          </Link>
        </td>
        <td>{referral}</td>
        <td>{forum}</td>
        <td>{editCount}</td>
        <td>
          <ColoredText rank={rank}>{total}</ColoredText>
        </td>
      </tr>
    </tbody>
  );
});

const ColoredText = styled.p<{ rank: number }>`
  margin: 0;
  color: ${({ rank }) =>
    rank < 3 ? styles.colors.yellowTextColor : styles.colors.blueTextColor};
`;

const ColorBgText = styled(ColoredText)`
  background-color: ${({ rank }) =>
    rank < 3 ? styles.colors.metamaskBackgroundColor : '#EDF1FB'};
  width: 42px;
  border-radius: 12.5px;
`;
