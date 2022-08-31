import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  width: string;
  height: string;
  borderRadius?: string;
  children: ReactNode;
};

/* https://github.com/vercel/next.js/issues/18497#issuecomment-762397599 */
export default memo(function ImageWrapper({
  width,
  height,
  borderRadius = '0',
  children,
}: PropsType) {
  return (
    <Outer width={width} height={height} borderRadius={borderRadius}>
      <Inner>{children}</Inner>
    </Outer>
  );
});

const Outer = styled.div<{
  width: string;
  height: string;
  borderRadius: string;
}>`
  flex-shrink: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ borderRadius }) => {
    if (borderRadius !== '0') {
      return `
        border-radius: ${borderRadius};
        overflow: hidden;
        outline: 1px solid ${styles.colors.logoColor}
      `;
    }
    return '';
  }};
`;

const Inner = styled.div`
  position: relative;
  max-width: 100%;
  height: 100%;
`;
