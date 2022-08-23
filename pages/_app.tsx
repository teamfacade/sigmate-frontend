import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useCallback, FormEventHandler } from 'react';
import { MainLayout, UserLayout } from 'layouts';
import { Navbar, Footer } from 'containers/global';
import 'styles/globals.css';
import 'styles/MyCalendar.css';
import 'styles/ShowModal.css';
import 'styles/Fade.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  const onSearch: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const title = (e.target as HTMLFormElement).bar.value;
      (e.target as HTMLFormElement).bar.value = '';
      router.push(`/main/wiki/${title}`);
    },
    [router]
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <Script src="dist/clipboard.min.js" strategy="lazyOnload" />
      {router.pathname.startsWith('/auth') ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <>
          <Navbar />
          {router.pathname.startsWith('/main') && (
            <MainLayout onSearch={onSearch}>
              {getLayout(<Component {...pageProps} />)}
            </MainLayout>
          )}
          {router.pathname.startsWith('/user') && (
            <UserLayout>{getLayout(<Component {...pageProps} />)}</UserLayout>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
