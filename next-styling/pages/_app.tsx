import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = {
  colors: {
    primary: '#355C7D',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
