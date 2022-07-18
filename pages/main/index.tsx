import { memo } from 'react';
import styled from 'styled-components';
import colors from 'styles/colorLib';
import { MainImage, Team, Backers } from 'components/main';

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
  color: ${colors.logoColor};
  font-size: 60px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
`;
