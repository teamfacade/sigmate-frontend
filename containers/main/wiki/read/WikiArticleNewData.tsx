import {
  useState,
  useCallback,
  useRef,
  useMemo,
  MouseEventHandler,
  memo,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import { NewReadBlock } from 'containers/main/wiki/read';
import { VerdictModal } from 'containers/main/wiki/read/verdictModal';
import { ReadKeyInfo, Title, Types } from 'components/main/wiki/read';
import { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  document: Wiki.NewDataDocumentType;
};

export default function WikiArticleNewData({ document }: PropsType) {
  console.log(document);
  const router = useRouter();
  const { signedIn } = useAppSelector(({ auth }) => auth);
  const { userName, isTester, isAdmin } = useAppSelector(
    ({ account }) => account
  );

  const [showModal, setShowModal] = useState<Wiki.ModalDataType>({
    blockID: '',
  });
  const [pending, setPending] = useState<boolean>(false);
  const ModalRef = useRef<HTMLDivElement>(null);

  const VerificationData: Wiki.VerificationType | undefined = useMemo(() => {
    /*
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
                    document.keyInfo[showModal.blockID];
                return {
                    verificationCounts: targetBlock.verificationCounts,
                    myVerification: targetBlock.myVerification,
                };
            }
        }
         */
    return undefined;
  }, [document, showModal.blockID]);

  const onClickEdit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setPending(true);
    if (signedIn && userName)
      router.push(`/main/wiki-edit/${document.id}`).catch((e) => {
        alert(`Error while routing to edit page: ERR ${e.name}`);
        setPending(false);
      });
    else {
      alert('You have to sign in to edit the document.');
      router.push('/auth').catch((e) => {
        alert(`Error while routing to edit page: ERR ${e.name}`);
        setPending(false);
      });
    }
  }, [signedIn, userName, document]);

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title title={document.title} />
        {(isTester === true || isAdmin === true) && (
          <EditBtn disabled={pending} onClick={onClickEdit}>
            {pending ? '...' : 'Edit'}
          </EditBtn>
        )}
      </div>
      <Types types={document.types || []} />
      {document.keyInfo && (
        <ReadKeyInfo setShowModal={setShowModal} keyInfo={document.keyInfo} />
      )}
      {document.data.blocks?.map((block) => {
        return (
          <NewReadBlock
            key={block.id}
            id={block.id as string}
            element={block.type}
            content={block.data.text}
            verificationCounts={{ verifyCount: 0, beAwareCount: 0 }}
            myVerification={null}
            opinionCount={0}
            setShowModal={setShowModal}
          />
        );
      })}
      {/*
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
            */}
    </Wrapper>
  );
}

const Wrapper = memo(styled.div`
  position: relative;
`);

const EditBtn = memo(styled.button`
  ${BlueBtnStyle};
  flex: 0 1 auto;
  width: 133px;
  height: 45px;
  margin: 0 0 0 10px;
`);
