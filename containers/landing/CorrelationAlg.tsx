import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { Title } from 'components/landing/CorrelationAlg';
import styles from 'styles/styleLib';
import { CorrelationEx } from 'public/Icons/landingPage';

export default function CorrelationAlg() {
  return (
    <Wrapper>
      <div>
        <Title />
        <Content>
          <ImageWrapper width="100%" height="100%">
            <Image
              src={CorrelationEx}
              layout="fill"
              objectFit="contain"
              priority
            />
          </ImageWrapper>
          <BlurFilter>
            <p>Coming soon</p>
          </BlurFilter>
        </Content>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 42px min(72px, calc((100% - 300px) / 2)) 112px;
  background-color: #ffffff;

  > div {
    position: relative;
    max-width: 1280px;
    margin: auto;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4.67;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.blueShadow};
  overflow: hidden;
`;

const BlurFilter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  backdrop-filter: blur(10px);

  p {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    text-align: center;
    color: #96b8d7;
    font-family: 'Claris Sans', sans-serif;
    font-size: 5vw;
    font-weight: 200;
    line-height: 150%;
  }
`;
