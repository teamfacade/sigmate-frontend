import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper, TransparentBtn } from 'components/global';
import { Texts } from 'components/landing/Forum';
import styles from 'styles/styleLib';
import { ForumExample } from 'public/Icons/landingPage';

export default function Forum() {
  return (
    <Wrapper>
      <div>
        <Texts />
        <Link href="/main/forum" passHref>
          <CurvedTransparentBtn>
            <ImageWrapper width="1200px" height="600px">
              <Image
                src={ForumExample}
                alt="Forum capture image"
                layout="fill"
              />
            </ImageWrapper>
          </CurvedTransparentBtn>
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    padding: 83px 190px 0 190px;
    margin: auto;
  }
  background-color: #ffffff;
`;

const CurvedTransparentBtn = styled(TransparentBtn)`
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  border: 2.5px solid ${styles.colors.darkGrayBorderColor};
  border-bottom: none;
  overflow: hidden;
  box-shadow: ${styles.shadows.landingBlueShadow};
`;
