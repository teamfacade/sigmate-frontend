import Link from 'next/link';
import styled from 'styled-components';
import { SocialLinkWrapper, SocialLinkBtn } from 'components/global';
import styles from 'styles/styleLib';
import { WavingHand } from 'public/Icons/landingPage';

export default function Buttons() {
  return (
    <Wrapper>
      <Link href="/main/wiki/Sigmate" passHref>
        <HandShake>
          <div>
            <WavingHand />
            <p>Launch App</p>
          </div>
        </HandShake>
      </Link>
      <SocialLinkWrapper btnWidth="56px" btnHeight="56px" marginLeft="8px">
        <SocialLinkBtn platform="Twitter" />
        <SocialLinkBtn platform="Telegram" />
        <SocialLinkBtn platform="Discord" />
        <SocialLinkBtn platform="Medium" />
      </SocialLinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HandShake = styled.button`
  padding: 13px 100px;
  margin: 0 24px 0 0;
  border-radius: 8px;
  border: none;
  background-color: #ffffff;
  box-shadow: 2px 2px 10px 0 rgba(38, 40, 82, 0.1);

  div {
    display: flex;
    align-items: center;

    p {
      margin: 0 0 0 8px;
      color: ${styles.colors.darkTextColor};
      font-size: 20px;
      font-weight: 700;
      line-height: 160%;
    }
  }
`;
