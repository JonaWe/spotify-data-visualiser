import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import theme from '../config/theme';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
