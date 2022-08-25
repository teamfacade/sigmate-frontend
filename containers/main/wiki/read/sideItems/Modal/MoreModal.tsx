import {
  memo,
  MouseEventHandler,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { Contents, BlurDiv } from 'containers/main/wiki/read/sideItems/Modal';
import { SectionWrapper } from 'components/global';
import { Close as CloseIcon } from 'public/Icons/global';
import styles from 'styles/styleLib';

type PropsType = {
  header: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(
  forwardRef<HTMLDivElement, PropsType>(function MoreModal(
    { header, onClick },
    ref
  ) {
    const [signedIn, setSignedIn] = useState(false);

    const onClickSignBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
      () => setSignedIn((current) => !current),
      []
    );

    return (
      <Background ref={ref}>
        <Modal>
          <SectionWrapper header={header} marginBottom="16px">
            <Close onClick={onClick}>
              <CloseIcon />
            </Close>
            <Contents header={header} />
            {!signedIn && <BlurDiv />}
          </SectionWrapper>
        </Modal>
        <button type="button" onClick={onClickSignBtn}>
          SignIn/Out
        </button>
      </Background>
    );
  })
);

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Modal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  padding: 33px;
  background-color: ${styles.colors.globalBackgroundColor};
  border-radius: 10px;
  overflow-y: hidden;
  box-shadow: ${styles.shadows.modalShadow};
`;

const Close = styled.button`
  position: absolute;
  top: -3px;
  right: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: #c7cdd6;
  cursor: pointer;

  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;
