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
  padding: 13vh 0;
  margin: 0;
`;

export const CenterdGridWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding-bottom: 10vh;
`;

export const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.fcPrimary};
  min-height: 100vh;
`;

export const Card = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgSecondary};
  border-radius: 2em;
  padding: 2em;
  width: 250px;
  @media screen and (max-width: 768px) {
    max-width: 70vw;
  }
`;

export const CardTitle = styled.h2`
  font-size: 2em;
  text-align: center;
`;

export const CardDescription = styled.p`
  font-size: 1.15em;
  text-align: center;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accentColor};
    :hover {
      text-decoration: underline;
    }
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 5em;

  @media screen and (max-width: 1200px) {
    grid-auto-flow: row;
  }
`;

export const UploadCard = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgSecondary};
  border-radius: 2em;
  padding: 2em;
  margin: 0 5vw;
`;

export const UploadCardTitle = styled.h2`
  text-align: center;
  font-size: 2em;
`;

export const UploadCardDescription = styled.p`
  color: ${(props) => props.theme.fcLight};
  text-align: center;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accentColor};
    :hover {
      text-decoration: underline;
    }
  }
`;

export const HighlightedCardDescription = styled.span`
  color: ${(props) =>
    props.warning ? props.theme.dangerColor : props.theme.fcPrimary};
`;

export const DragZone = styled.div`
  color: ${(props) => props.theme.fcLight};
  border: dotted 2px ${(props) => props.theme.bgMDark};
  border-radius: 1em;
  padding: 10vh 10vw;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 5vh 5vw;
  }

  p {
    font-size: 1.25em;
    font-style: italic;
  }
`;

export const MainContent = styled.div`
  width: 80vw;
  background-color: ${(props) => props.theme.bgSecondary};
  margin-bottom: 15vh;
  border-radius: 2em;
  display: grid;
  align-items: center;
  justify-items: center;

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;
