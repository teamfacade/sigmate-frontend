import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { Title } from 'components/landing/RoadMap';
import styles from 'styles/styleLib';
import { Roadmap } from 'public/Icons/landingPage';

export default function RoadMap() {
  return (
    <Wrapper>
      <div>
        <Title />
        <Content>
          <ImageWrapper width="100%" height="100%">
            <Image src={Roadmap} layout="fill" objectFit="contain" priority />
          </ImageWrapper>
        </Content>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 42px 72px 112px;
  background-color: ${styles.colors.emptyColor};

  > div {
    position: relative;
    max-width: 1280px;
    margin: auto;
  }
`;

const Content = styled.div`
  width: 100%;
  aspect-ratio: 2.76;
`;
