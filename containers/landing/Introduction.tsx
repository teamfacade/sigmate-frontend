import styled from 'styled-components';
import {
  Logo,
  TopBar,
  SearchBar,
  BlackSocialLinks,
} from 'components/landing/Introduction';
import styles from 'styles/styleLib';

export default function Introduction() {
  return (
    <Wrapper>
      <CenterAllocatingDiv>
        <TopBar />
        <ContentsWrapper>
          <Logo />
          <Phrase>All you need to know about your NFT</Phrase>
          <SearchBar />
        </ContentsWrapper>
        <BlackSocialLinks />
      </CenterAllocatingDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 48px;
`;

const CenterAllocatingDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: auto;
`;

const Phrase = styled.p`
  margin: 0 0 38px 0;
  color: ${styles.colors.landingIntroText};
  font-size: 32px;
  font-weight: 500;
  line-height: 120%;
  text-align: center;
`;
