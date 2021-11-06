import { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import { StylesConfig, ThemeConfig } from 'react-select';

function getSelectStyles(theme, minWidth: string): StylesConfig {
  return {
    container: (provided) => ({
      ...provided,
      maxWidth: '400px',
      minWidth: minWidth,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '5px',
    }),
    menuList: (provided) => ({
      ...provided,
      overflowX: 'hidden',
      '::-webkit-scrollbar': {
        width: '10px',
      },
      '::-webkit-scrollbar-track': {
        background: theme.bgMDark,
        borderRadius: '5px',
      },
      '::-webkit-scrollbar-thumb': {
        background: theme.fcULight,
        borderRadius: '5px',
        '&:hover, &:active': {
          background: theme.accentColor,
        },
      },
    }),
  };
}

function getSelectTheme(theme): ThemeConfig {
  return (t) => ({
    ...t,
    colors: {
      ...t.colors,
      neutral0: theme.bgPrimary, // main bg
      // neutral5: theme.test, // unknown
      neutral10: theme.bgMDark, // selected items
      neutral20: theme.fcULight, // outline color
      neutral30: theme.accentColor, // hover outline color
      neutral40: theme.fcLight, // hover icon color and item not found
      neutral50: theme.fcLight, // placeholder color
      neutral60: theme.fcLight, // active icons color color
      // neutral70: theme.test, // unknown
      neutral80: theme.fcPrimary, // font color
      // neutral90: theme.test, // unknown
      primary: theme.accentColor + 'BF',
      primary75: theme.accentColor + 'BF',
      primary50: theme.accentColor + '80',
      primary25: theme.accentColor + '40',
      danger: theme.dangerColor,
      dangerLight: theme.dangerColor + '00',
    },
  });
}

export default function useSelectStyles(minWidth: string = '200px') {
  const theme = useContext(ThemeContext);
  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme, minWidth);

  return { selectStyles, selectTheme };
}
