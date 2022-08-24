import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  height: string;
  maxWord: number;
  content: string;
};

export default memo(function EllipsisText({
  height,
  maxWord,
  content,
}: PropsType) {
  return (
    <Text height={height}>{`${content.slice(0, maxWord)}${
      maxWord <= content.length ? ' ...' : ''
    }`}</Text>
  );
});

const Text = styled.p<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  margin: 5px 0 0 0;
  color: ${styles.colors.logColor};
  font-size: 13px;
  font-weight: 300;
  line-height: 160%;
`;
