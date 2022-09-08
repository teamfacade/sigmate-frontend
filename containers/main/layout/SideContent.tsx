import { memo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { SideRecentEdits } from 'containers/main/layout';
import { Adsense } from 'components/main/Layout';
import { SocialLinks } from 'components/auth';
import styles from 'styles/styleLib';

const WhatsHappening = dynamic(
  () => import('containers/main/wiki/read/sideItems/WhatsHappening'),
  { ssr: false }
);

const Debate = dynamic(
  () => import('containers/main/wiki/read/sideItems/Debate'),
  { ssr: false }
);

export default memo(function SideContent() {
  const router = useRouter();

  return (
    <>
      <SideRecentEdits />
      {/* <BuyToken /> */}
      {router.pathname.startsWith('/main/wiki/') &&
        router.query.title !== 'empty' && (
          <>
            <WhatsHappening title={router.query.title as string} />
            <Debate title={router.query.title as string} />
          </>
        )}
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
