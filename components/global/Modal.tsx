import { memo, forwardRef, ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  children: ReactNode;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  height?: string;
  overflow?: string;
};

export default memo(
  forwardRef<HTMLDivElement, PropsType>(function Modal(
    { children, onMouseDown, overflow, height },
    ref
  ) {
    return (
      <Background onMouseDown={onMouseDown} ref={ref}>
        <ModalComponent
          overflow={overflow}
          height={height}
          onMouseDown={(e) => e.stopPropagation()}
        >
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
  z-index: 2;
`;

const ModalComponent = styled.div<{ overflow?: string; height?: string }>`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(750px, 50vw);
  height: ${({ height }) => height || '60vh'};
  padding: 33px;
  background-color: ${styles.colors.globalBackgroundColor};
  border-radius: 10px;
  overflow-y: ${({ overflow }) => overflow || 'hidden'};
  box-shadow: ${styles.shadows.modalShadow};
`;
