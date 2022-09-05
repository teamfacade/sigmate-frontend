import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Axios from 'lib/global/axiosInstance';
import { getProfileData } from 'lib/main/profile/getUserProfile';
import { SectionWrapper } from 'components/global';
import { ProfileComponents } from 'containers/main/profile';

export default function Profile({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (profile === null) {
    return (
      <SectionWrapper header="No user found" marginBottom="40px">
        <div />
      </SectionWrapper>
    );
  }
  return (
    <SectionWrapper header="Profile" marginBottom="40px">
      <ProfileComponents
        PFPUrl={profile.profile.profileImageUrl || ''}
        username={profile.user?.userName || ''}
        displayName={profile.profile.displayName}
        bio={profile.profile.bio}
        level={12.3}
        twitterID={profile.user?.twitterHandle}
        discordID={profile.user?.discordAccount}
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
