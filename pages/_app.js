import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';
import theme from '../config/theme';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
