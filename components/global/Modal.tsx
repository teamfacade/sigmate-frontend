import { memo, forwardRef, ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  children: ReactNode;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
};

export default memo(
  forwardRef<HTMLDivElement, PropsType>(function Modal(
    { children, onMouseDown },
    ref
  ) {
    return (
      <Background onMouseDown={onMouseDown} ref={ref}>
        <ModalComponent onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </ModalComponent>
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
`;

const ModalComponent = styled.div`
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
