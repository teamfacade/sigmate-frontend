import { memo, Dispatch, SetStateAction } from 'react';
import { ReadComponent, VerdictBlock } from 'components/main/wiki/read';

type PropsType = {
  id: number;
  tag: string;
  content: string;
  setShowVerdictModal: Dispatch<SetStateAction<number>>;
};

export default memo(function ReadBlock({
  id,
  tag,
  content,
  setShowVerdictModal,
}: PropsType) {
  return (
    <VerdictBlock id={id} setShowVerdictModal={setShowVerdictModal}>
      <ReadComponent tag={tag} content={content} />
    </VerdictBlock>
  );
});
