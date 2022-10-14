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
          <p>{'© Copyright 2022 Sigmate. \r\nAll rights reserved.'}</p>
        </Copyright>
      </div>
    </footer>
  );
});

const Wrapper = styled.div`
  position: relative;
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
  @media (min-width: 729px) {
    float: right;

    p {
      white-space: nowrap;
    }
  }
  @media (max-width: 728px) {
    float: left;
    padding-left: 30px;
    p {
      white-space: pre;
    }
  }

  p {
    margin: 0 20px 20px 0;
    color: ${styles.colors.lightTextColor};
    font-size: 13px;
    font-family: 'Inter', sans-serif;
  }
`;
