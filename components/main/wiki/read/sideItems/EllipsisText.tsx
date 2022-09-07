import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  height: string;
  content: string;
  children?: ReactNode;
};

export default memo(function EllipsisText({
  height,
  content,
  children = null,
}: PropsType) {
  return (
    <Wrapper height={height}>
      <Text height={height}>{content}</Text>
      <Dots>...</Dots>
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ height: string }>`
  position: relative;
  height: ${({ height }) => height};
`;

const Text = styled.p<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  margin: 5px 0 0 0;
  color: ${styles.colors.logColor};
  font-size: 13px;
  font-weight: 300;
  line-height: 160%;
  overflow: hidden;
`;

const Dots = styled.p`
  position: absolute;
  right: 0;
  bottom: -4px;
  padding-left: 5px;
  margin: 0;
  background: #ffffff;
  color: ${styles.colors.logColor};
  font-size: 13px;
  font-weight: 300;
  line-height: 160%;
`;
