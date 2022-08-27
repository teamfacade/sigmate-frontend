import { MouseEventHandler, useState, useCallback, forwardRef } from 'react';
import styled from 'styled-components';
import {
  CommunityVerdict,
  Opinion,
} from 'containers/main/wiki/read/verdictModal';
import { Modal } from 'components/global';
import {
  VerdictModalBtn,
  VerdictLog,
} from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

type PropsType = {
  verdict: VerdictType;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
};

export default forwardRef<HTMLDivElement, PropsType>(function VerdictModal(
  { verdict, onMouseDown },
  ref
) {
  const [vote, setVote] = useState<VoteType>({
    voted: verdict?.voted || '',
    timestamp: new Date(Date.now()).toISOString(),
  });

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setVote({
        voted: e.currentTarget.name,
        timestamp: new Date(Date.now()).toISOString(),
      });
    },
    [verdict]
  );

  return (
    <Modal ref={ref}>
      <Msg>What is your verdict on this content?</Msg>
      <VerdictBtnWrapper>
        <VerdictModalBtn name="Verify" voted={vote.voted} onClick={onClick} />
        <VerdictModalBtn name="Warning" voted={vote.voted} onClick={onClick} />
      </VerdictBtnWrapper>
      <VerdictLog vote={vote} />
      <Opinion />
      <CommunityVerdict verdict={verdict} />
    </Modal>
  );
});

const Msg = styled.p`
  margin: 0 0 13px 0;
  color: ${styles.colors.logoColor};
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

const VerdictBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
`;
