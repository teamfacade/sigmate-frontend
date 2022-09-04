import { memo } from 'react';
import styled from 'styled-components';
import convertDate from 'lib/global/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  votes: Wiki.VerificationType;
};

export default memo(function VerdictLog({ votes }: PropsType) {
  if (votes.isUpvote !== null)
    return (
      <Log voted={votes.isUpvote ? 'Verify' : 'Warning'}>{`You ${
        votes.isUpvote ? 'verified' : 'flagged'
      } this block at ${convertDate(
        new Date(votes.timestamp),
        'time',
        ' '
      )}`}</Log>
    );
  return <Log voted="None" />;
});

const Log = styled.p<{ voted: string }>`
  margin: 17px 0 0 0;
  color: ${({ voted }) =>
    voted === 'Verify' ? styles.colors.emphColor : styles.colors.warningColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
`;
