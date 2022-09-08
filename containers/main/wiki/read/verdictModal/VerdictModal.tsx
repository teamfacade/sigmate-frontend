import {
  MouseEventHandler,
  useState,
  useCallback,
  forwardRef,
  useEffect,
} from 'react';
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
import { getVerifyData } from 'lib/main/wiki/getWikiData';

type PropsType = {
  documentID: number;
  isKeyInfo: boolean;
  blockID: number;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
};

export default forwardRef<HTMLDivElement, PropsType>(function VerdictModal(
  { documentID, isKeyInfo, blockID, onMouseDown },
  ref
) {
  useEffect(() => {
    setVotes(getVerifyData(documentID, isKeyInfo, blockID).verification);
  }, []);

  const [votes, setVotes] = useState<Wiki.VerificationType>({
    id: -1,
    verify: 0,
    warning: 0,
    isUpvote: null,
    timestamp: '0',
  });

  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;
      setVotes((current) => ({
        ...current,
        isUpvote: name === 'Verify',
        timestamp: new Date(Date.now()).toISOString(),
      }));
    },
    []
  );

  return (
    <Modal overflow="initial" onMouseDown={onMouseDown} ref={ref}>
      <Msg>What is your verdict on this content?</Msg>
      <VerdictBtnWrapper>
        <VerdictModalBtn
          name="Verify"
          isUpvote={votes.isUpvote}
          onClick={onClickVerdict}
        />
        <VerdictModalBtn
          name="Warning"
          isUpvote={votes.isUpvote}
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
