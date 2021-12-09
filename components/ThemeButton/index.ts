import styled from 'styled-components';

export const ThemeButton = styled.span`
  display: grid;
  padding: 0.35em;
  font-size: 2vw;
  color: ${(props) => props.theme.bgPrimary};
  background-color: ${(props) => props.theme.fcLight};
  border-radius: 100vh;
  box-shadow: 0.25vw 0.25vw 1.5vw
    ${(props) => (props.theme.isDarkTheme ? '0.3vw' : '-0.1vw')}
    rgba(0, 0, 0, 0.5);

  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 0 2.5vh 2.5vh;
`;
