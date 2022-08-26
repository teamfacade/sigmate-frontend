import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getProfileData } from 'lib/main/profile/getUserProfile';
import { SectionWrapper } from 'components/global';
import { ProfileComponents } from 'containers/main/profile';

export default function Profile({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SectionWrapper header="Profile" marginBottom="40px">
        <ProfileComponents
          PFPUrl={profile.PFPUrl}
          username={profile.username}
          displayName={profile.displayName}
          bio={profile.bio}
          level={profile.level}
          twitterUrl={profile.twitterUrl}
          discordID={profile.discordID}
        />
      </SectionWrapper>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  // Fetch data from external API
  const profileData = getProfileData(params?.username as string);

  // Pass data to the page via props
  return { props: profileData };
}
