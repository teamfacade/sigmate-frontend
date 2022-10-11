import { memo } from 'react';
import styled from 'styled-components';
import convertDate from 'lib/global/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  votes: Wiki.VerificationType;
};

export default memo(function VerdictLog({ votes }: PropsType) {
  if (votes.myVerification !== null)
    return (
      <Log voted={votes.myVerification}>{`You ${
        votes.myVerification ? 'verified' : 'flagged'
      } this block at ${convertDate(new Date(Date.now()), 'time', ' ')}`}</Log>
    );
  return <Log voted={false} />;
});

const Log = styled.p<{ voted: boolean }>`
  margin: 17px 0 0 0;
  color: ${({ voted }) =>
    voted ? styles.colors.emphColor : styles.colors.warningColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
`;
