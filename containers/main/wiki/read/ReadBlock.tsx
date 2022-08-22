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

export default memo(function ReadBlock({
  id,
  tag,
  content,
  verdict,
  showVerdictModal,
  setShowVerdictModal,
  onMouseDown,
}: PropsType) {
  const [voted, setVoted] = useState(verdict?.voted || '');
  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setVoted(e.currentTarget.name);
    },
    [verdict]
  );

  return (
    <>
      <VerdictBlock
        id={id}
        setShowVerdictModal={setShowVerdictModal}
        voted={voted}
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
          verdict={verdict}
          onMouseDown={onMouseDown}
          onClick={onClickVerdict}
        />
      </CSSTransition>
    </>
  );
});
