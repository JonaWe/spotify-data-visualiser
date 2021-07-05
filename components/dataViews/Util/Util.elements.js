import { ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

export const CustomToolTipWrapper = styled.div`
  padding: 0.15em 1em;
  border-radius: 0.35em;
  background-color: ${({ theme }) => theme.fcPrimary}C0;
  color: ${({ theme }) => theme.bgDark};
  /* backdrop-filter: blur(3px); */
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

export const ChartWrapper = ({ children }) => {
  return (
    <ChartDivWrapper>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </ChartDivWrapper>
  );
};

export const ChartDivWrapper = styled.div`
  width: 85%;
  height: 80vh;
`;

export const getSelectStyles = (theme) => ({
  container: (provided, state) => ({
    ...provided,
    color: theme.bgPrimary,
    maxWidth: '400px',
    minWidth: '200px',
  }),
});

export const getSelectTheme = (theme) => {
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
};
