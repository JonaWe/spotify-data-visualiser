import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import { lightTheme, darkTheme } from '../config/theme';
import { ThemeButton } from '../components/ThemeButton';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/globals.css';
import useLocalStorage from '../hooks/useLocalStorage';

const META_DATA = {
  title: 'Visualisify - Spotify User Data Visualizer',
  description:
    'Analyse your Spotify data and get an interesting insight in your listening activity. Find out what time of day you like to listen the most and more.',
  URL: 'https://www.visualisify.live/',
  author: 'Jona Wessendorf',
  image_URL: 'https://www.visualisify.live/images/preview.png',
};

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(darkTheme);
  const [darkMode, setDarkMode] = useLocalStorage('darkModeActive', true);
  const [buttonIcon, setButtonIcon] = useState(FaSun);

  useEffect(() => {
    setTheme(darkMode ? darkTheme : lightTheme);
    setButtonIcon(darkMode ? FaSun : FaMoon);
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((current) => !current);
  }
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/logo.svg" />

        {/* Primary meta tags */}
        <title>{META_DATA.title}</title>
        <meta name="title" content={META_DATA.title} />
        <meta name="description" content={META_DATA.description} />

        {/* Facebook meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={META_DATA.URL} />
        <meta property="og:title" content={META_DATA.title} />
        <meta property="og:description" content={META_DATA.description} />
        <meta property="og:image" content={META_DATA.image_URL} />

        {/* Twitter meta tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={META_DATA.URL} />
        <meta property="twitter:title" content={META_DATA.title} />
        <meta property="twitter:description" content={META_DATA.description} />
        <meta property="twitter:image" content={META_DATA.image_URL} />

        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content={META_DATA.author} />
      </Head>
      <Component {...pageProps} />
      <Footer />
      <ThemeButton onClick={() => toggleTheme()}>{buttonIcon}</ThemeButton>
    </ThemeProvider>
  );
}
