import { memo, Dispatch, SetStateAction } from 'react';
import { ReadComponent, NewReadComponent } from 'components/main/wiki/read';
import { VerdictBlock } from 'components/main/wiki/read/verdictModal';

type PropsType = {
  id: string;
  element: string;
  content: any;
  verificationCounts: Wiki.VerificationCountType;
  myVerification: boolean | null;
  opinionCount: number;
  setShowModal: Dispatch<SetStateAction<Wiki.ModalDataType>>;
};

export default memo(function NewReadBlock({
  id,
  element,
  content,
  verificationCounts,
  myVerification,
  opinionCount,
  setShowModal,
}: PropsType) {
  return (
    <VerdictBlock
      id={id}
      setShowModal={setShowModal}
      verificationCounts={verificationCounts}
      myVerification={myVerification}
      opinionCount={opinionCount}
    >
      {/* <ReadComponent element={element} content={content} /> */}
      <NewReadComponent element={element} content={content} />
    </VerdictBlock>
  );
});
