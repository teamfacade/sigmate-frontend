import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  rank: number;
  userName: string;
  displayName?: string | null;
  referral: number;
  forum: number;
  editCount: number;
  total: number;
  isMine?: boolean;
};

export default memo(function LeaderboardItem({
  rank,
  userName,
  displayName,
  referral,
  forum,
  editCount,
  total,
  isMine,
}: PropsType) {
  return (
    <tbody>
      <tr>
        <td>
          <ColorBgText rank={rank} isMine={isMine}>
            {rank}
          </ColorBgText>
        </td>
        <td>
          <Link href={isMine ? `/user` : `/main/profile/${userName}`}>
            <a>
              <ColoredText rank={rank} isMine={isMine}>
                {displayName || userName}
              </ColoredText>
            </a>
          </Link>
        </td>
        <td>{referral}</td>
        <td>{forum}</td>
        <td>{editCount}</td>
        <td>
          <ColoredText rank={rank} isMine={isMine}>
            {total}
          </ColoredText>
        </td>
      </tr>
    </tbody>
  );
});

const ColoredText = styled.p<{ rank: number; isMine?: boolean }>`
  margin: 0;
  color: ${({ rank, isMine }) => {
    if (isMine) return styles.colors.positiveTextColor;
    return rank < 3
        ? styles.colors.yellowTextColor
        : styles.colors.blueTextColor;
  }};
`;

const ColorBgText = styled(ColoredText)`
  background-color: ${({ rank, isMine }) => {
    if (isMine) return styles.colors.positiveBgColor;
    return rank < 3 ? styles.colors.metamaskBackgroundColor : '#EDF1FB';
  }};
  width: 42px;
  border-radius: 12.5px;
`;
