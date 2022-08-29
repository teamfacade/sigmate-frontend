import styled from 'styled-components';
import { SocialIcon } from 'components/main/profile';
import styles from 'styles/styleLib';

type PropsType = {
  bio: string | null;
  twitterID: string;
  discordID: string;
};

export default function BioAndSocials({
  bio,
  twitterID,
  discordID,
}: PropsType) {
  return (
    <Wrapper>
      <Bio>{bio}</Bio>
      <Socials>
        {twitterID && (
          <SocialWrapper>
            <SocialIcon platform="Twitter" />
            <p>{`@${twitterID}`}</p>
          </SocialWrapper>
        )}
        {discordID && (
          <SocialWrapper>
            <SocialIcon platform="Discord" />
            <p>{`#${discordID}`}</p>
          </SocialWrapper>
        )}
      </Socials>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Bio = styled.p`
  max-width: 440px;
  height: 92px;
  margin: 0 0 20px 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  overflow: hidden scroll;
`;

const Socials = styled.div`
  display: flex;
  flex-direction: column;

  div + div {
    margin-top: 8px;
  }
`;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 8px;
    color: ${styles.colors.logColor};
    font-size: 14px;
    font-weight: 500;
    line-height: 160%;
  }
`;
