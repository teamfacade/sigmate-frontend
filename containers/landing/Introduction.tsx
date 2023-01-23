import styled from 'styled-components';
import { Logo, TopBar, SearchBar } from 'components/landing/Introduction';
import styles from 'styles/styleLib';

export default function Introduction() {
  return (
    <Wrapper>
      <TopBar />
      <ContentsWrapper>
        <Logo />
        <Phrase>All you need to know about your NFT</Phrase>
        <SearchBar />
      </ContentsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 48px;
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
