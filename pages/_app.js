import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import '../styles/globals.css';
import theme from '../config/theme';
import Footer from '../components/Footer';

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
