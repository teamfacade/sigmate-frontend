import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import WrongUrl from 'public/Icons/etc/WrongUrl.png';

export default function NotFound() {
  return (
    <Wrapper>
      <ImageWrapper width="100%" height="100%">
        <Image src={WrongUrl} alt="Page Not Found" layout="fill" priority />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 606px;
  margin: auto;
`;
