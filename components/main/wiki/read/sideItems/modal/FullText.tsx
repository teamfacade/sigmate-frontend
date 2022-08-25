import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import styles from 'styles/styleLib';

type PropsType = {
  content: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function EllipsisText({ content, onClick }: PropsType) {
  return (
    <div>
      <Text>{content}</Text>
      <BtnWrapper>
        <HideBtn onClick={onClick}>Hide</HideBtn>
      </BtnWrapper>
    </div>
  );
});

const Text = styled.p`
  width: 100%;
  margin: 5px 0 0 0;
  color: ${styles.colors.logColor};
  font-size: 13px;
  font-weight: 300;
  line-height: 160%;
`;

const BtnWrapper = styled.div`
  position: relative;
  height: 17px;
`;

const HideBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: ${styles.colors.emphColor};
  font-size: 14px;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  :hover,
  :active {
    color: ${darken(0.3, styles.colors.emphColor)};
  }
`;
