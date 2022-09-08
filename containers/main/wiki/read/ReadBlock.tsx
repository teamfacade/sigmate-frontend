import { memo, Dispatch, SetStateAction } from 'react';
import { ReadComponent } from 'components/main/wiki/read';
import { VerdictBlock } from 'components/main/wiki/read/verdictModal';

type PropsType = {
  id: number;
  element: string;
  content: string;
  verifications?: Wiki.BlockVerificationType;
  setShowModal: Dispatch<SetStateAction<Wiki.ModalDataType>>;
};

export default memo(function ReadBlock({
  id,
  element,
  content,
  verifications,
  setShowModal,
}: PropsType) {
  return (
    <VerdictBlock
      id={id}
      setShowModal={setShowModal}
      verifications={verifications}
    >
      <ReadComponent element={element} content={content} />
    </VerdictBlock>
  );
});
