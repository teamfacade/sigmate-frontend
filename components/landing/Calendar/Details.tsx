import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';
import { UpcomingDetail, CalendarIcon } from 'public/Icons/landingPage';

export default function Details() {
  return (
    <Wrapper>
      <div>
        <CalendarIcon />
        <Title>Calendar</Title>
      </div>
      <Explanation>Keep you updated with upcoming drops</Explanation>
      <ImageWrapper width="500px" height="480px">
        <Image
          src={UpcomingDetail}
          alt="Detail example image"
          layout="fill"
          objectFit="contain"
        />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 34px;

  > div:first-child {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
`;

const Title = styled.p`
  margin: 0 0 0 20px;
  color: ${styles.colors.darkTextColor};
  font-size: 58px;
  font-weight: 700;
  line-height: 180%;
`;

const Explanation = styled.p`
  margin: 0 0 16px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 500;
  line-height: 180%;
`;
