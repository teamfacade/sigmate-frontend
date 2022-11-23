import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Axios from 'lib/global/axiosInstance';
import { SideRecentEdits } from 'containers/main/layout';
// import { SocialLinks } from 'components/auth';

const WhatsHappening = dynamic(
  () => import('containers/main/wiki/read/sideItems/WhatsHappening'),
  { ssr: false }
);

/*
const Debate = dynamic(
  () => import('containers/main/wiki/read/sideItems/Debate'),
  { ssr: false }
);
*/

export default memo(function SideContent() {
  const router = useRouter();
  const [cid, setCid] = useState<number | null>(null);

  useEffect(() => {
    if (
      router.pathname.startsWith('/main/wiki/') &&
      router.query.id &&
      router.query.id !== 'Sigmate'
    ) {
      Axios.get(`/wiki/d/${router.query.id}`)
        .then((res) => {
          if (res.status === 200) setCid(res.data.data.collection.id);
        })
        .catch((e) =>
          alert(`Error while fetching collection id. ERR ${e.response.status}`)
        );
    }
  }, [router]);

  return (
    <>
      <SideRecentEdits
        documentId={
          router.pathname.startsWith('/main/wiki/')
            ? (router.query.id as string | undefined)
            : undefined
        }
      />
      {/* <BuyToken /> */}
      {router.pathname.startsWith('/main/wiki/') &&
        router.pathname !== '/main/wiki/Sigmate' &&
        !router.pathname.startsWith('/main/wiki/search') && (
          <>
            <WhatsHappening cid={cid} />
            {/* <Debate title={router.query.title as string} /> */}
          </>
        )}
      {/*
      <SocialLinkWrapper>
        <p>Social Link</p>
        <SocialLinks />
      </SocialLinkWrapper>
      */}
    </>
  );
});

/*
const SocialLinkWrapper = styled.div`
  margin-top: 20px;

  p {
    margin: 0 0 10px 0;
    color: #353535;
    font-size: 18px;
    font-weight: bold;
  }
`;
*/
