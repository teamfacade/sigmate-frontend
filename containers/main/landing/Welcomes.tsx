import styled from 'styled-components';
import { Star } from 'public/Icons/landingPage';

export default function Welcomes() {
  return (
    <LayoutWrapper>
      <Upper>
        <GrayTextWrapper>
          <p style={{ fontWeight: 700 }}>First Launch in</p>
          <p style={{ fontWeight: 300 }}>Sep 9th</p>
        </GrayTextWrapper>
        <NavyText>The Best Nft Wiki Platform</NavyText>
        <StarWrapper>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </StarWrapper>
      </Upper>
      <Lower>
        <p>👋🏻Welcome to Sigmate</p>
      </Lower>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 60px;
`;

const Upper = styled.div`
  width: 80%;
  padding: 32px;
  margin-bottom: 17px;
  background-color: #ffffff;
  border-radius: 19.15px;
  box-shadow: 0 90px 145px 0 rgba(0, 0, 0, 0.05);
`;

const GrayTextWrapper = styled.div`
  display: flex;

  p {
    margin: 0;
    color: #b4b4b4;
    font-size: 18px;
    line-height: 127%;
  }

  p + p {
    margin-left: 20px;
  }
`;

const NavyText = styled.p`
  margin: 5px 200px 15px 0;
  color: #2b3377;
  font-size: 22px;
  font-weight: 700;
  line-height: 127%;
  white-space: nowrap;
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Lower = styled.div`
  padding: 6px 17px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 2px 2px 12px 0 rgba(38, 40, 82, 0.1);

  p {
    margin: 0;
    color: #606060;
    font-size: 20px;
    font-weight: 400;
    line-height: 160%;
  }
`;
