import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { VerdictModalBtn } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function VerdictModal({ onMouseDown, onClick }: PropsType) {
  return (
    <Background onMouseDown={onMouseDown}>
      <Modal onMouseDown={(e) => e.stopPropagation()}>
        <Msg>What is your verdict on this content?</Msg>
        <VerdictBtnWrapper>
          <VerdictModalBtn name="ThumbsUp" voted="ThumbsUp" onClick={onClick} />
          <VerdictModalBtn name="Warning" voted="ThumbsUp" onClick={onClick} />
        </VerdictBtnWrapper>
      </Modal>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const Modal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  padding: 19px 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: ${styles.shadows.modalShadow};
`;

const Msg = styled.p`
  margin: 0 0 13px 0;
  color: ${styles.colors.logoColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 140%;
`;

const VerdictBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
`;
