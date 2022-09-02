import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import {
  Apple,
  Mango,
  Lime,
  UltraViolet,
  Orca,
  MangoSteen,
  Strawberry,
} from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

const Images: StringKeyObj<typeof Apple> = {
  Apple,
  'Mr Mango': Mango,
  Lime,
  'Ultra Violet': UltraViolet,
  Orca,
  'Mr Steen': MangoSteen,
  Strawberry,
};

type PropsType = {
  name: string;
  position: string;
  bgColor: string;
  positionBgColor: string;
  fontColor: string;
};

export default (function Member({
  name,
  position,
  bgColor,
  positionBgColor,
  fontColor,
}: PropsType) {
  return (
    <Wrapper>
      <ImageWrapperBackground bgColor={bgColor}>
        <ImageWrapper width="309px" height="152px">
          <Image
            src={Images[name]}
            alt="profile"
            layout="fill"
            objectFit="contain"
          />
        </ImageWrapper>
      </ImageWrapperBackground>
      <InfoLayoutWrapper>
        <Name>{name}</Name>
        <Position fontColor={fontColor} positionBgColor={positionBgColor}>
          <p>{position}</p>
        </Position>
      </InfoLayoutWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 311px;
  height: 195px;
  border-radius: 8px;
  border: 1px solid #f4f4f4;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: hidden;
`;

const ImageWrapperBackground = styled.div<{ bgColor: string }>`
  width: 309px;
  height: 152px;
  background-color: ${({ bgColor }) => bgColor};
  margin: 0;
`;

const InfoLayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 12px 15px;
`;

const Name = styled.p`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 700;
  line-height: 160%;
`;

const Position = styled.div<{ positionBgColor: string; fontColor: string }>`
  height: 19px;
  padding: 2px 14px;
  border-radius: 9px;
  background-color: ${({ positionBgColor }) => positionBgColor};
  text-align: center;

  p {
    margin: 0;
    color: ${({ fontColor }) => fontColor};
    font-size: 8px;
    font-weight: 900;
    line-height: 12px;
  }
`;
