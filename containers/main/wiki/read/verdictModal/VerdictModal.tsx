import { MouseEventHandler, useState, useCallback } from 'react';
import styled from 'styled-components';
import { VerdictType } from 'lib/main/wiki/getWikiData';
import { CommunityVerdict } from 'containers/main/wiki/read/verdictModal';
import { VerdictModalBtn } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

type PropsType = {
  verdict: VerdictType;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function VerdictModal({
  verdict,
  onMouseDown,
  onClick,
}: PropsType) {
  const [showCommVerdict, setShowCommVerdict] = useState(false);

  const onClickShowCommVerdict: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setShowCommVerdict((curShow) => !curShow);
    }, []);

  return (
    <Background onMouseDown={onMouseDown}>
      <Modal onMouseDown={(e) => e.stopPropagation()}>
        <Msg>What is your verdict on this content?</Msg>
        <VerdictBtnWrapper>
          <VerdictModalBtn
            name="ThumbsUp"
            voted={verdict?.voted || ''}
            onClick={onClick}
          />
          <VerdictModalBtn
            name="Warning"
            voted={verdict?.voted || ''}
            onClick={onClick}
          />
        </VerdictBtnWrapper>
        <CommunityVerdict
          showCommVerdict={showCommVerdict}
          onClick={onClickShowCommVerdict}
        />
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
  padding: 19px 24px 30px;
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