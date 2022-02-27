import { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function CustomLoader() {
  const theme = useContext(ThemeContext);
  return <ThreeDots color={theme.accentColor} height={100} width={100} />;
}
