import Image from 'next/image';
import styled from 'styled-components';
import { Navbar } from 'containers/global';
import { ImageWrapper } from 'components/global';
import WrongUrl from 'public/Icons/etc/WrongUrl.png';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <ImageWrapper width="100%" height="fit-content">
          <Image
            src={WrongUrl}
            alt="Page Not Found"
            layout="responsive"
            priority
          />
        </ImageWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
`;
