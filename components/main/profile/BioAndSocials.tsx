import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  bio: string;
  twitterUrl: string;
  discordID: string;
};

export default function BioAndSocials({
  bio,
  twitterUrl,
  discordID,
}: PropsType) {
  return (
    <Wrapper>
      <Bio>{bio}</Bio>
      <Socials>
        <p>{twitterUrl}</p>
        <p>{discordID}</p>
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
  font-weight: 500;
  line-height: 160%;
  overflow: hidden scroll;
`;

const Socials = styled.div`
  display: flex;

  p {
    margin: 0;
  }

  p + p {
    margin-left: 10px;
  }
`;
