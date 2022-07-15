import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { MainLayout } from 'layouts';
import { Navbar, Footer } from 'containers/global';
import 'styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  console.log(router.pathname);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      {router.pathname.startsWith('/auth') ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <>
          <Navbar />
          {router.pathname.startsWith('/main') && (
            <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
