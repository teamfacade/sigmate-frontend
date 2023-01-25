import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper, TransparentBtn } from 'components/global';
import { Details } from 'components/landing/Calendar';
import { UpcomingExample } from 'public/Icons/landingPage';

export default function Calendar() {
  return (
    <Wrapper>
      <div>
        <Link href="/main/upcoming" passHref>
          <ShadowedTransparentBtn>
            <ImageWrapper width="700px" height="625px">
              <Image
                src={UpcomingExample}
                alt="Example image"
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper>
          </ShadowedTransparentBtn>
        </Link>
        <Details />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > div {
    display: flex;
    align-items: center;
    margin: auto;
  }
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 112px;
`;

const ShadowedTransparentBtn = styled(TransparentBtn)`
  border-radius: 26px;
  box-shadow: 0 1.5px 76px 0 rgb(123, 123, 123, 0.25);
`;
