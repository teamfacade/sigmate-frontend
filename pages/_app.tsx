import { useRouter } from 'next/router';
import { useCallback, FormEventHandler } from 'react';
import { wrapper } from 'store/store';
import { MainLayout, UserLayout, Heads } from 'layouts';
import { Navbar, Footer } from 'containers/global';
import 'styles/globals.css';
import 'styles/Calendars.css';
import 'styles/ShowModal.css';
import 'styles/Fade.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
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

  if (router.pathname.startsWith('/auth')) {
    return (
      <>
        <Heads />
        getLayout(
        <Component {...pageProps} />
      </>
    );
  }
  if (router.pathname.startsWith('/main')) {
    return (
      <>
        <Heads />
        <Navbar />
        <MainLayout
          needsWrapper={
            !(
              router.pathname.startsWith('/main/forum') ||
              router.pathname.startsWith('/main/upcoming')
            )
          }
          onSearch={onSearch}
        >
          {getLayout(<Component {...pageProps} />)}
        </MainLayout>
        <Footer />
      </>
    );
  }
  if (router.pathname.startsWith('/user')) {
    return (
      <>
        <Heads />
        <Navbar />
        <UserLayout>{getLayout(<Component {...pageProps} />)}</UserLayout>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Heads />
      <Navbar />
      {getLayout(<Component {...pageProps} />)}
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
