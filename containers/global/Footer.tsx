import { memo } from 'react';
import styled from 'styled-components';
import { ExternalLinks } from 'components/Footer';
import { SocialLinks } from 'components/auth';
import styles from 'styles/styleLib';

export default memo(function Footer() {
  return (
    <footer>
      <div style={{ width: '100%' }}>
        <Wrapper>
          <OuterWrapper>
            <SocialLinkWrapper>
              <p>Social Link</p>
              <SocialLinks />
            </SocialLinkWrapper>
            <ExternalLinks />
          </OuterWrapper>
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

const OuterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 986px) {
    display: block;
  }
`;

const Copyright = styled.div`
  @media (min-width: 987px) {
    float: right;

    p {
      white-space: nowrap;
    }
  }
  @media (max-width: 986px) {
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

const SocialLinkWrapper = styled.div`
  margin-top: 20px;

  p {
    margin: 0 0 10px 0;
    color: #353535;
    font-size: 18px;
    font-weight: bold;
  }
`;
