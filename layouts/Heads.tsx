import Head from 'next/head';
import Script from 'next/script';

export default function Heads() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <Script src="dist/clipboard.min.js" strategy="lazyOnload" />
    </>
  );
}