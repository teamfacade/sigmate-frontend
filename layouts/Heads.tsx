import Head from 'next/head';
import Script from 'next/script';

type PropsType = {
  curPath: string;
};

export default function Heads({ curPath }: PropsType) {
  return (
    <>
      <Head>
        <title>Sigmate</title>
        <meta property="og:url" content={curPath} />
        <meta property="og:title" content="Sigmate" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/Icons/Favicon/Logo_310x310.png" />
        <meta
          property="og:description"
          content="All you need to know about your NFT"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <Script src="node_modules/clipboard/dist/clipboard.min.js" />
    </>
  );
}
