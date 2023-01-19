import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { Title } from 'components/landing/CorrelationAlg';
import styles from 'styles/styleLib';
import { CorrelationEx } from 'public/Icons/landingPage';

export default function CorrelationAlg() {
  return (
    <Wrapper>
      <Title />
      <Description>
        More Reasonable Valuation Model using both On&Off Chain Data
      </Description>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 50px 0 100px 0;
`;

const Description = styled.p`
  margin: 0 0 40px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 28px;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
`;

const Content = styled.div`
  position: relative;
  left: 50%;
  display: flex;
  justify-content: center;
  width: 90vw;
  transform: translateX(-50%);
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
    color: #767676;
    font-family: 'Claris Sans', sans-serif;
    font-size: 5vw;
    font-weight: 200;
    line-height: 150%;
  }
`;
