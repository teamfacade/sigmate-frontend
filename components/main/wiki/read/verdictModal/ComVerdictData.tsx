import { memo } from 'react';
import styled from 'styled-components';

type PropsType = {
  show: boolean;
};

export default memo(function ComVerdictData({ show }: PropsType) {
  return <Wrapper show={show}>HELLO!</Wrapper>;
});

const Wrapper = styled.div<{ show: boolean }>`
  margin-top: ${({ show }) => (show ? '0' : '-100%')};
  transition: all 300ms ease-in-out;
`;
