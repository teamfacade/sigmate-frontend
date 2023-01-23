import styled from 'styled-components';
import Image from 'next/image';
import { ImageWrapper } from 'components/global';
import { Texts } from 'components/landing/Features';
import { WikiExample } from 'public/Icons/landingPage';

export default function Wikis() {
  return (
    <Wrapper>
      <Texts />
      <ImageWrapper width="100%" height="600px">
        <Image
          src={WikiExample}
          alt="Main page image"
          layout="fill"
          objectFit="contain"
        />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 86px 0 86px 112px;
  background-color: #ffffff;
`;
