import { memo } from 'react';
import styled from 'styled-components';
import { ExternalLinks } from 'components/Footer';
import styles from 'styles/styleLib';

export default memo(function Footer() {
  return (
    <footer>
      <div style={{ width: '100%' }}>
        <Wrapper>
          <Logo>Sigmate</Logo>
          <ExternalLinks />
        </Wrapper>
        <Copyright>
          <p>© Copyright 2022 Sigmate. All rights reserved</p>
        </Copyright>
      </div>
    </footer>
  );
});

const Wrapper = styled.div`
  position: relative;
  display: flex;
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
  float: right;

  p {
    margin: 0 20px 20px 0;
    color: ${styles.colors.lightTextColor};
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
`;
