import styled from 'styled-components';
import Image from 'next/image';
import { ImageWrapper } from 'components/global';
import { Texts } from 'components/landing/Features';
import styles from 'styles/styleLib';
import { WikiExample } from 'public/Icons/landingPage';

export default function Wikis() {
  return (
    <Wrapper>
      <div>
        <Texts />
        <div
          style={{
            boxShadow: styles.shadows.landingBlueShadow,
            borderRadius: '26px',
          }}
        >
          <ImageWrapper width="1052px" height="690px">
            <Image
              src={WikiExample}
              alt="Main page image"
              layout="fill"
              objectFit="contain"
              priority
            />
          </ImageWrapper>
        </div>
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
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 86px 0 86px 112px;
  background-color: #ffffff;
`;
