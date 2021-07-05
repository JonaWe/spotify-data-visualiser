import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  font: inherit;
  font-weight: 500;
  font-size: 1.15em;
  text-align: center;
  text-transform: uppercase;

  color: ${(props) => props.theme.fcPrimary};
  background: ${(props) => (props.primary ? props.theme.accentColor : 'none')};

  box-shadow: inset 0px 0px 0px ${(props) => (props.primary ? 0 : 2)}px
    ${({ theme }) => theme.fcPrimary};
  box-sizing: border-box;

  border: none;
  outline: none;
  padding: 0.75em 1.75em;
  border-radius: 10em;

  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    /* background: ${(props) =>
      props.primary ? '' : props.theme.accentColor}; */
    /* color: ${(props) => (props.primary ? '' : props.theme.bgPrimary)}; */
  }
`;

export const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  padding: 17vh 0;
  margin: 0;
`;

export const CenterdGridWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;

export const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.fcPrimary};
  min-height: 100vh;
`;
