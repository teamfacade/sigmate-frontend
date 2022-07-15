import { memo } from 'react';
import styled from 'styled-components';
import colors from 'styles/colorLib';

export default memo(function Footer() {
  return (
    <footer>
      <Wrapper>
        <Logo />
      </Wrapper>
    </footer>
  );
});

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
`;

const Logo = styled.p`
  margin: 0;
  color: ${colors.logoColor};
  font-size: 35px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
  cursor: pointer;
`;
