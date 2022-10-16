import Link from 'next/link';
import styled from 'styled-components';
import { SocialLinkWrapper, SocialLinkBtn } from 'components/global';
import styles from 'styles/styleLib';
import { WavingHand } from 'public/Icons/landingPage';

export default function Buttons() {
  return (
    <Wrapper>
      <HandShake>
        <div>
          <WavingHand />
          <p>Launch App</p>
        </div>
      </HandShake>
      <SocialLinkDiv>
        <SocialLinkWrapper btnWidth="56px" btnHeight="56px" marginLeft="8px">
          <SocialLinkBtn platform="Twitter" />
          <SocialLinkBtn platform="Telegram" />
          <SocialLinkBtn platform="Discord" />
          <SocialLinkBtn platform="Medium" />
        </SocialLinkWrapper>
      </SocialLinkDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media (min-width: 729px) {
    display: flex;
    align-items: center;
  }
  @media (max-width: 728px) {
    display: inline-grid;
  }
`;

const HandShake = styled.a`
  width: max(300px, min(365px, calc(100vw - 144px)));
  padding: 13px 0;
  border-radius: 8px;
  border: none;
  background-color: #ffffff;
  box-shadow: 2px 2px 10px 0 rgba(38, 40, 82, 0.1);

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      position: relative;
      top: -3px;
    }

    p {
      margin: 0 0 0 8px;
      color: ${styles.colors.darkTextColor};
      font-size: 20px;
      font-weight: 700;
      line-height: 160%;
      white-space: pre;
    }
  }
`;

const SocialLinkDiv = styled.div`
  @media (min-width: 729px) {
    margin: 0 0 0 24px;
  }
  @media (max-width: 728px) {
    margin: 32px 0 0 0;
  }
`;
