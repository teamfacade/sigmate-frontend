import {
  useState,
  useCallback,
  useMemo,
  useRef,
  MouseEventHandler,
  memo,
} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { ReadBlock } from 'containers/main/wiki/read';
import { VerdictModal } from 'containers/main/wiki/read/verdictModal';
import { ReadKeyInfo, Title, Types } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  document: Wiki.DocumentType;
};

export default function WikiArticle({ document }: PropsType) {
  const [showModal, setShowModal] = useState<Wiki.ModalDataType>({
    documentID: document.id,
    isKeyInfo: false,
    blockID: -1,
  });
  const ModalRef = useRef<HTMLDivElement>(null);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () =>
      setShowModal((current) => ({
        ...current,
        blockID: -1,
      })),
    []
  );

  return (
    <Wrapper>
      <Title title={document.title} />
      <Types types={document.types || []} />
      {document.keyInfos && (
        <ReadKeyInfo setShowModal={setShowModal} keyInfos={document.keyInfos} />
      )}
      {document.blocks?.map((block) => {
        return (
          <ReadBlock
            key={block.id}
            id={block.id}
            element={block.element}
            content={block.textContent}
            setShowModal={setShowModal}
            verifications={block.verifications}
          />
        );
      })}
      <Link href={`/main/wiki-edit/${document.title}`} passHref>
        <NonDarkenAnchor>
          <EditBtn>Edit</EditBtn>
        </NonDarkenAnchor>
      </Link>
      <CSSTransition
        in={showModal.blockID !== -1}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <VerdictModal
          documentID={showModal.documentID}
          isKeyInfo={showModal.isKeyInfo}
          blockID={showModal.blockID}
          onMouseDown={onMouseDown}
          ref={ModalRef}
        />
      </CSSTransition>
    </Wrapper>
  );
}

const Wrapper = memo(styled.div`
  position: relative;
  padding-left: 80px;
`);

const EditBtn = memo(styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 133px;
  height: 45px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background-color: ${styles.colors.emphColor};
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
`);

const NonDarkenAnchor = styled.a`
  :hover,
  :active {
    filter: none !important;
  }
`;
