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
  verificationData?: Wiki.VerificationType;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
};

export default forwardRef<HTMLDivElement, PropsType>(function VerdictModal(
  { verificationData, onMouseDown },
  ref
) {
  const [votes, setVotes] = useState<Wiki.VerificationType>(
    verificationData as Wiki.VerificationType
  );

  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;
      setVotes((current) => {
        // user voted first time
        if (current.myVerification === null) {
          return {
            verificationCounts: {
              verifyCount:
                current.verificationCounts.verifyCount +
                (name === 'Verify' ? 1 : 0),
              beAwareCount:
                current.verificationCounts.beAwareCount +
                (name === 'Warning' ? 1 : 0),
            },
            myVerification: name === 'Verify',
          };
        }
        if (name === 'Verify') {
          // canceled verify
          if (current.myVerification) {
            return {
              ...current,
              verificationCounts: {
                ...current.verificationCounts,
                verifyCount: current.verificationCounts.verifyCount - 1,
              },
              myVerification: null,
            };
          }
          return {
            verificationCounts: {
              verifyCount: current.verificationCounts.verifyCount + 1,
              beAwareCount: current.verificationCounts.beAwareCount - 1,
            },
            myVerification: true,
          };
        }
        // name === 'BeAware'
        if (current.myVerification) {
          return {
            verificationCounts: {
              verifyCount: current.verificationCounts.verifyCount - 1,
              beAwareCount: current.verificationCounts.beAwareCount + 1,
            },
            myVerification: false,
          };
        }
        // canceled warning
        return {
          verificationCounts: {
            ...current.verificationCounts,
            beAwareCount: current.verificationCounts.beAwareCount - 1,
          },
          myVerification: null,
        };
      });
    },
    []
  );

  return (
    <Modal overflow="initial" onMouseDown={onMouseDown} ref={ref}>
      <Msg>What is your verdict on this content?</Msg>
      <VerdictBtnWrapper>
        <VerdictModalBtn
          name="Verify"
          isUpvote={votes.myVerification}
          onClick={onClickVerdict}
        />
        <VerdictModalBtn
          name="Warning"
          isUpvote={votes.myVerification}
          onClick={onClickVerdict}
        />
      </VerdictBtnWrapper>
      <VerdictLog votes={votes} />
      <Opinion />
      <CommunityVerdict votes={votes} />
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
