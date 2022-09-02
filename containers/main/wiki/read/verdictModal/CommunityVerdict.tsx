import { MouseEventHandler, memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ComVerdictData } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

type PropsType = {
  verdict: VerdictType;
};

export default memo(function CommunityVerdict({ verdict }: PropsType) {
  const [showCommVerdict, setShowCommVerdict] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowCommVerdict((curShow) => !curShow);
  }, []);

  return (
    <>
      <Btn onClick={onClick}>{`Show Community Verdict ${
        showCommVerdict ? '▼' : '▶'
      }`}</Btn>
      <ComVerdictWrapper>
        <ComVerdictData verdict={verdict} show={showCommVerdict} />
      </ComVerdictWrapper>
    </>
  );
});

const Btn = styled.button`
  padding: 0;
  margin: 8px 0 0 0;
  background-color: transparent;
  border: none;
  color: ${styles.colors.logoColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  font-family: 'Inter', sans-serif;
`;

const ComVerdictWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  margin-top: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${styles.colors.tableRowColor};
  box-shadow: ${styles.shadows.modalShadow};
  overflow: hidden;
`;
