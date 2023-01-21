import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper, TransparentBtn } from 'components/global';
import { Details } from 'components/landing/Calendar';
import { UpcomingExample } from 'public/Icons/landingPage';

export default function Calendar() {
  return (
    <Wrapper>
      <Link href="/main/upcoming" passHref>
        <TransparentBtn>
          <ImageWrapper width="700px" height="625px">
            <Image
              src={UpcomingExample}
              alt="Example image"
              layout="fill"
              objectFit="contain"
            />
          </ImageWrapper>
        </TransparentBtn>
      </Link>
      <Details />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 108px 165px 108px;
`;
