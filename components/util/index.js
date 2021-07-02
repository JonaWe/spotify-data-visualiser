import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  font: inherit;
  font-weight: 500;
  font-size: 1.15em;
  text-align: center;
  text-transform: uppercase;

  color: ${(props) =>
    props.primary ? props.theme.fcPrimary : props.theme.accentColor};
  background: ${(props) => (props.primary ? props.theme.accentColor : 'none')};

  box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.accentColor};
  box-sizing: border-box;

  border: none;
  outline: none;
  padding: 0.75em 1.75em;
  border-radius: 10em;

  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: ${(props) => (props.primary ? 'scale(1.05)' : '')};
    background: ${(props) => (props.primary ? '' : props.theme.accentColor)};
    color: ${(props) => (props.primary ? '' : props.theme.bgPrimary)};
  }
`;
