import { memo, Dispatch, SetStateAction, MouseEventHandler } from 'react';
import { ReadComponent } from 'components/main/wiki/read';
import { VerdictBlock } from 'components/main/wiki/read/verdictModal';

type PropsType = {
  id: number;
  tag: string;
  content: string;
  voted: string;
  setShowVerdictModal: Dispatch<SetStateAction<number>>;
  onClickVerdict: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function ReadBlock({
  id,
  tag,
  content,
  voted,
  setShowVerdictModal,
  onClickVerdict,
}: PropsType) {
  return (
    <VerdictBlock
      id={id}
      setShowVerdictModal={setShowVerdictModal}
      voted={voted}
      onClickVerdict={onClickVerdict}
    >
      <ReadComponent tag={tag} content={content} />
    </VerdictBlock>
  );
});
