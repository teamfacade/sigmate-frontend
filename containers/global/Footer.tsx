import { memo } from 'react';
import styled from 'styled-components';
import { ExternalLinks } from 'components/Footer';
import styles from 'styles/styleLib';

export default memo(function Footer() {
  return (
    <footer>
      <Wrapper>
        <Logo>sigmate</Logo>
        <ExternalLinks />
        <Copyright>
          <p>© Copyright 2022 sigmate. All rights reserved</p>
        </Copyright>
      </Wrapper>
    </footer>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 30px;
  background: linear-gradient(#f0f2f5, transparent);
`;

const Logo = styled.p`
  margin: 0 40px 0 0;
  color: ${styles.colors.logoColor};
  font-size: 35px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
  cursor: pointer;
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  p {
    margin: 0;
    color: ${styles.colors.lightTextColor};
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
`;
