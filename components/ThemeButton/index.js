import styled from 'styled-components';

export const ThemeButton = styled.span`
  display: grid;
  padding: 0.35em;
  font-size: 2em;
  color: ${(props) => props.theme.bgPrimary};
  background-color: ${(props) => props.theme.fcLight};
  border-radius: 100vh;
  box-shadow: 5px 5px 15px
    ${(props) => (props.theme.isDarkTheme ? '7px' : '-1px')} rgba(0, 0, 0, 0.5);

  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 0 2.5vh 2.5vh;
`;
