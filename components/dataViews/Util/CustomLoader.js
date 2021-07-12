import { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import Loader from 'react-loader-spinner';

export default function CustomLoader() {
  const theme = useContext(ThemeContext);
  return (
    <Loader
      type="ThreeDots"
      color={theme.accentColor}
      height={100}
      width={100}
    />
  );
}
