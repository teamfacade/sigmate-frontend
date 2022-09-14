import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import TEMP from 'public/Icons/landingPage/TEMP.png';

export default function MyApp() {
  return (
    <div>
      <Link href="/main/wiki/sigmate">
        <A>
          <ImageWrapper width="100vw" height="100%">
            <Image src={TEMP} layout="responsive" priority />
          </ImageWrapper>
        </A>
      </Link>
    </div>
  );
}

const A = styled.a`
  :hover,
  :active {
    filter: none;
    cursor: unset;
  }
`;
