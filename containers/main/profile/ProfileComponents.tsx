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
      <CirclePFP>
        <PFP PFPUrl={PFPUrl} />
      </CirclePFP>
      <NameAndLevel
        username={username}
        displayName={displayName}
        level={level}
      />
      <BioAndSocials bio={bio} twitterID={twitterID} discordID={discordID} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px 40px 40px;
`;

const CirclePFP = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 170px;
  border: 1px solid #fac29f;
  overflow: hidden;
`;
