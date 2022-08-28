const ExProfile: ProfileType = {
  PFPUrl: '',
  username: 'Wookyung Seo',
  displayName: 'Berry',
  bio: 'Hello  https:// the cites of the word in classical literatur. com\ndsfasdfadsthe cites dl literatuYour display name will \nbe used in places where your profile needs to be displayed. to be \nIf left blank, your username will',
  level: 12.3,
  twitterID: 'elonmusk',
  discordID: '4357',
};

export function getProfileData(username: string) {
  /*
          Returns an object that has all needed data to render someone's profile page,
          which looks like this:

          {
                PFPUrl: string;
                username: string;
                displayName: string;
                bio: string;
                level: number;
                twitterUrl?: string;
                discordID?: string;
            }
      */

  // @todo 프로필 데이터 받아오기
  const profile = { ...ExProfile, username };

  return {
    profile,
  };
}
