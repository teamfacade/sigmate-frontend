import { memo, Dispatch, SetStateAction } from 'react';
import { ReadComponent } from 'components/main/wiki/read';
import { VerdictBlock } from 'components/main/wiki/read/verdictModal';

type PropsType = {
  id: number;
  tag: string;
  content: string;
  verdict: VerdictType;
  setShowModal: Dispatch<SetStateAction<number>>;
};

export default memo(function ReadBlock({
  id,
  tag,
  content,
  verdict,
  setShowModal,
}: PropsType) {
  return (
    <VerdictBlock id={id} setShowModal={setShowModal} verdict={verdict}>
      <ReadComponent tag={tag} content={content} />
    </VerdictBlock>
  );
});
