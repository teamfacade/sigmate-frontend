import styled from 'styled-components';
import { PFP, NameAndLevel, BioAndSocials } from 'components/main/profile';

type PropsType = {
  PFPUrl: string;
  username: string;
  displayName: string;
  bio: string;
  level: number;
  twitterUrl?: string;
  discordID?: string;
};

export default function ProfileComponents({
  PFPUrl,
  username,
  displayName,
  bio,
  level,
  twitterUrl = '',
  discordID = '',
}: PropsType) {
  return (
    <Wrapper>
      <PFP PFPUrl={PFPUrl} />
      <NameAndLevel
        username={username}
        displayName={displayName}
        level={level}
      />
      <BioAndSocials bio={bio} twitterUrl={twitterUrl} discordID={discordID} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px 40px 40px;
`;
