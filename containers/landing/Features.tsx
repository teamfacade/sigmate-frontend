import styled from 'styled-components';
import Image from 'next/image';
import { ImageWrapper } from 'components/global';
import { Texts } from 'components/landing/Features';
import { Roadmap } from 'public/Icons/landingPage';

export default function Features() {
  return (
    <Wrapper>
      <Texts />
      <ImageWrapper width="100%" height="100%">
        <Image src={Roadmap} alt="Main page image" />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 232px 108px;
`;
