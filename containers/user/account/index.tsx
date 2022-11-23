import { CSSTransition } from 'react-transition-group';
import { Modal } from 'components/global';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import Syncs from './Syncs';
import Infos from './Infos';
import DeletAccountModal from './DeleteAccountModal';

export default function Account() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const ModalRef = useRef<HTMLDivElement>(null);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <div>
        <Syncs />
        <Infos setShowModal={setShowModal} />
        {/*
                    <WikiSettings />
                */}
      </div>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          <DeletAccountModal />
        </Modal>
      </CSSTransition>
    </>
  );
}
