import { memo } from 'react';
import styled from 'styled-components';
import convertDate from 'hooks/convertDate';
import { VoteType } from 'containers/main/wiki/read/ReadBlock';
import styles from 'styles/styleLib';

type PropsType = {
  vote: VoteType;
};

export default memo(function VerdictLog({ vote }: PropsType) {
  if (vote.voted)
    return (
      <Log voted={vote.voted}>{`You ${
        vote.voted === 'Verify' ? 'verified' : 'flagged'
      } this block at ${convertDate(
        new Date(vote.timestamp),
        'time',
        ' '
      )}`}</Log>
    );
  return <Log voted={vote.voted} />;
});

const Log = styled.p<{ voted: string }>`
  margin: 17px 0 0 0;
  color: ${({ voted }) =>
    voted === 'Verify' ? styles.colors.emphColor : styles.colors.warningColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
`;
