import {
  useState,
  useCallback,
  useRef,
  useMemo,
  MouseEventHandler,
  memo,
} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { SigmateDocument as document } from 'lib/main/wiki/getWikiData';
import { ReadBlock } from 'containers/main/wiki/read';
import { VerdictModal } from 'containers/main/wiki/read/verdictModal';
import { ReadKeyInfo, Title, Types } from 'components/main/wiki/read';

export default function Sigmate() {
  const [showModal, setShowModal] = useState<Wiki.ModalDataType>({
    blockID: '',
  });
  const ModalRef = useRef<HTMLDivElement>(null);
  const VerificationData: Wiki.VerificationType | undefined = useMemo(() => {
    if (showModal.blockID !== '') {
      const targetID = Number.parseInt(showModal.blockID, 10);
      if (Number.isInteger(targetID) && document.blocks) {
        const targetBlock = Object.values(document.blocks).find(
          (block) => block.id === Number.parseInt(showModal.blockID, 10)
        );
        if (targetBlock)
          return {
            verificationCounts: targetBlock.verificationCounts,
            myVerification: targetBlock.myVerification,
          };
      } else if (Number.isNaN(targetID) && document.keyInfo) {
        const targetBlock: Wiki.DocumentBlockType =
          document.keyInfo[showModal.blockID.toLowerCase()];
        return {
          verificationCounts: targetBlock.verificationCounts,
          myVerification: targetBlock.myVerification,
        };
      }
    }
    return undefined;
  }, [showModal.blockID]);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () =>
      setShowModal((current) => ({
        ...current,
        blockID: '',
      })),
    []
  );

  return (
    <Wrapper>
      <Title title={document.title} />
      <Types types={document.types || []} />
      {document.keyInfo && (
        <ReadKeyInfo setShowModal={setShowModal} keyInfo={document.keyInfo} />
      )}
      {document.blocks &&
        document.structure.map((blockID) => {
          const block = (
            document.blocks as StringKeyObj<Wiki.DocumentBlockType>
          )[blockID.toString(10)];
          return (
            <ReadBlock
              key={block.id}
              id={block.id}
              element={block.element}
              content={block.textContent}
              setShowModal={setShowModal}
              verificationCounts={block.verificationCounts}
              myVerification={block.myVerification}
              opinionCount={block.opinionCount}
            />
          );
        })}
      <CSSTransition
        in={!!VerificationData}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <VerdictModal
          verificationData={VerificationData}
          onMouseDown={onMouseDown}
          ref={ModalRef}
        />
      </CSSTransition>
    </Wrapper>
  );
}

const Wrapper = memo(styled.div`
  position: relative;
`);
