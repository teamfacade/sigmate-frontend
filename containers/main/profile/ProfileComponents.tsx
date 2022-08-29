import styled from 'styled-components';
import { PFP, NameAndLevel, BioAndSocials } from 'components/main/profile';

type PropsType = {
  PFPUrl: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  level: number;
  twitterID?: string;
  discordID?: string;
};

export default function ProfileComponents({
  PFPUrl,
  username,
  displayName,
  bio,
  level,
  twitterID = '',
  discordID = '',
}: PropsType) {
  return (
    <Wrapper>
      <PFP PFPUrl={PFPUrl} />
      <NameAndLevel
        username={displayName || username}
        displayName=""
        level={level}
      />
      <BioAndSocials bio={bio} twitterID={twitterID} discordID={discordID} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px 40px 40px;
`;
