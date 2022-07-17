import { memo } from 'react';
import { RecentEdits, BuyToken } from 'components/main';
import { SocialLinks } from 'components/auth';

export default memo(function SideContent() {
  return (
    <>
      <RecentEdits />
      <BuyToken />
      <SocialLinks />
    </>
  );
});
