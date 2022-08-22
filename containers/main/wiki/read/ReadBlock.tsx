import {
  memo,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  useState,
  useCallback,
} from 'react';
import { VerdictType } from 'lib/main/wiki/getWikiData';
import { ReadComponent } from 'components/main/wiki/read';
import { VerdictBlock } from 'components/main/wiki/read/verdictModal';
import { CSSTransition } from 'react-transition-group';
import { VerdictModal } from './verdictModal';

type PropsType = {
  id: number;
  tag: string;
  content: string;
  verdict: VerdictType;
  showVerdictModal: boolean;
  setShowVerdictModal: Dispatch<SetStateAction<boolean>>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
};

export type VoteType = {
  voted: string;
  timestamp: string;
};

export default memo(function ReadBlock({
  id,
  tag,
  content,
  verdict,
  showVerdictModal,
  setShowVerdictModal,
  onMouseDown,
}: PropsType) {
  const [vote, setVote] = useState<VoteType>({
    voted: verdict?.voted || '',
    timestamp: new Date(Date.now()).toISOString(),
  });
  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setVote({
        voted: e.currentTarget.name,
        timestamp: new Date(Date.now()).toISOString(),
      });
    },
    [verdict]
  );

  return (
    <>
      <VerdictBlock
        id={id}
        setShowVerdictModal={setShowVerdictModal}
        voted={vote.voted}
        verdict={verdict}
        onClickVerdict={onClickVerdict}
      >
        <ReadComponent tag={tag} content={content} />
      </VerdictBlock>
      <CSSTransition
        in={showVerdictModal}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
      >
        <VerdictModal
          vote={vote}
          verdict={verdict}
          onMouseDown={onMouseDown}
          onClick={onClickVerdict}
        />
      </CSSTransition>
    </>
  );
});
