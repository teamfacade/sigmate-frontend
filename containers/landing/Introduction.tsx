import styled from 'styled-components';
import { Logo, Phrase, Buttons } from 'components/landing/Introduction';

export default function Introduction() {
  return (
    <Wrapper>
      <Logo />
      <TextLogo>Sigmate</TextLogo>
      <Phrase />
      <Buttons />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 88px 0 80px 72px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 15px solid #09b0e6;
  background: #c9e5ff;
`;

const TextLogo = styled.p`
  margin: 10px 0 10px 0;
  color: #282e39;
  font-size: 60px;
  font-weight: 100;
  font-family: 'Claris Sans', sans-serif;
`;
