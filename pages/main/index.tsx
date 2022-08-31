import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { MainImage, Team, Backers } from 'components/main/LandingPage';

export default memo(function MainPage() {
  return (
    <Wrapper>
      <Logo>sigmate</Logo>
      <MainImage />
      <Team />
      <Backers />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.p`
  margin: 0 0 15px 0;
  color: ${styles.colors.logoColor};
  font-size: 60px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
`;
