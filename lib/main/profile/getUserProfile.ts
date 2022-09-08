import Axios from 'lib/global/axiosInstance';

export async function getProfileData(username: string) {
  /*
          Returns an object that has all needed data to render someone's profile page,
          which looks like this:

          {
                user?: {
                    id: number;
                    userName: string;
                    metamaskWallet?: string;
                    twitterHandle?: string;
                    discordAccount?: string;
                },
                profile: {
                    id: number;
                    displayName: string | null;
                    bio: string | null;
                    profileImage: Image | null;
                    profileImageUrl: string | null;
                }
            }
      */

  // @todo 프로필 데이터 받아오기
  let profile: ProfileType;

  try {
    const res = await Axios.get(`/profile/u/${username}`, {
      params: { userName: username },
    });

    profile = { user: res.data.user, profile: res.data.profile };

    return {
      profile,
    };
  } catch (e) {
    return {
      profile: null,
    };
  }
}
