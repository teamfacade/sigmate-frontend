import { memo, ReactNode } from 'react';
import styled from 'styled-components';

type PropsType = {
  width: string;
  height: string;
  children: ReactNode;
};

/* https://github.com/vercel/next.js/issues/18497#issuecomment-762397599 */
export default memo(function ImageWrapper({
  width,
  height,
  children,
}: PropsType) {
  return (
    <Outer width={width} height={height}>
      <Inner>{children}</Inner>
    </Outer>
  );
});

const Outer = styled.div<{ width: string; height: string }>`
  flex-shrink: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const Inner = styled.div`
  position: relative;
  max-width: 100%;
  height: 100%;
`;
