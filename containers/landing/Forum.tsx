import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper, TransparentBtn } from 'components/global';
import { Texts } from 'components/landing/Forum';
import { ForumCaptureImg } from 'public/Icons/landingPage';

export default function Forum() {
  return (
    <Wrapper>
      <Texts />
      <Link href="/main/forum" passHref>
        <TransparentBtn>
          <ImageWrapper width="1200px" height="480px">
            <Image
              src={ForumCaptureImg}
              alt="Forum capture image"
              layout="fill"
            />
          </ImageWrapper>
        </TransparentBtn>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  padding: 95px 0 108px 0;
  margin: auto;
`;
