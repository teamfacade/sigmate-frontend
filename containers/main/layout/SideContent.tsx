import { memo } from 'react';
import styled from 'styled-components';
import { SideRecentEdits } from 'containers/main/layout';
import { Adsense } from 'components/main/Layout';
import { SocialLinks } from 'components/auth';

export default memo(function SideContent() {
  return (
    <>
      <SideRecentEdits />
      {/* <BuyToken /> */}
      <Adsense />
      <Adsense />
      <SocialLinkWrapper>
        <p>Social Link</p>
        <SocialLinks />
      </SocialLinkWrapper>
    </>
  );
});

const SocialLinkWrapper = styled.div`
  margin-top: 20px;

  p {
    margin: 0 0 10px 0;
    color: #353535;
    font-size: 18px;
    font-weight: bold;
  }
`;
