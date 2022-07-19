import { memo } from 'react';
import { SideRecentEdits, BuyToken } from 'components/main';
import { SocialLinks } from 'components/auth';

export default memo(function SideContent() {
  return (
    <>
      <SideRecentEdits />
      <BuyToken />
      <SocialLinks />
    </>
  );
});
