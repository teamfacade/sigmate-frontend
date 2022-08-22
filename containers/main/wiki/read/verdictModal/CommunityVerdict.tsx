import { MouseEventHandler, memo } from 'react';
import styled from 'styled-components';
import { ComVerdictData } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';
import { VerdictType } from 'lib/main/wiki/getWikiData';

type PropsType = {
  verdict: VerdictType;
  showCommVerdict: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function CommunityVerdict({
  verdict,
  showCommVerdict,
  onClick,
}: PropsType) {
  return (
    <>
      <Btn onClick={onClick}>Show Community Verdict ▶</Btn>
      <ComVerdictWrapper>
        <ComVerdictData verdict={verdict} show={showCommVerdict} />
      </ComVerdictWrapper>
    </>
  );
});

const Btn = styled.button`
  padding: 0;
  margin: 50px 0 0 0;
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
