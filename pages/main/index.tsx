import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import ImageWrapper from 'components/ImageWrapper';
import {
  backgroundChart,
  screenshotDesktop,
  screenshotPhone,
} from 'public/Icons';
import colors from 'styles/colorLib';

export default memo(function MainPage() {
  return (
    <Wrapper>
      <Logo>sigmate</Logo>
      <MainImageWrapper>
        <div style={{ position: 'relative' }}>
          <ImageWrapper width="550px" height="410px">
            <Image
              src={screenshotDesktop}
              alt="deskop page screenshot"
              layout="fill"
              quality={100}
            />
          </ImageWrapper>
          <PhoneImg>
            <ImageWrapper width="147px" height="277px">
              <Image
                src={screenshotPhone}
                alt="phone page screenshot"
                layout="fill"
                quality={100}
              />
            </ImageWrapper>
          </PhoneImg>
        </div>
        <Description>
          {
            'Maximize your NFT experience with sigmate.\r\nDiscover everything about NFT in sigmate.'
          }
        </Description>
        <BackgroundChart />
      </MainImageWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.p`
  margin: 0 0 15px 0;
  color: ${colors.logoColor};
  font-size: 60px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
`;

const MainImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    z-index: 1;
  }
`;

const Description = styled.p`
  margin: 30px 0 0 30px;
  padding-top: 14px;
  color: #4f4f4f;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  white-space: pre;
`;

const PhoneImg = styled.div`
  position: absolute;
  top: 140px;
  left: 500px;
  z-index: 5;
`;

const BackgroundChart = styled(backgroundChart)`
  position: absolute;
  top: 250px;
  left: -4px;
`;
