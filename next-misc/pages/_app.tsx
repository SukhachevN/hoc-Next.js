import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

import '../styles/globals.css';
import '../styles/layout.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Head>
          <title>Học Next JS</title> 
        </Head>
        <Header />
        {page}
        <Footer />
      </>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
