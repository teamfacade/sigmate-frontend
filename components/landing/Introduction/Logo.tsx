import styled from 'styled-components';
import styles from 'styles/styleLib';
import { SigmateLogo } from 'public/Icons/landingPage';

export default function Logo() {
  return (
    <Wrapper>
      <SigmateLogo />
      <TextLogo>Sigmate</TextLogo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`;

const TextLogo = styled.p`
  margin: 0 0 0 14px;
  color: ${styles.colors.landingIntroText};
  font-size: 80px;
  font-weight: 100;
  font-family: 'Claris Sans', sans-serif;
  line-height: 120%;
  letter-spacing: 1.6px;
`;
