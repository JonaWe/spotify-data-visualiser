import styled from 'styled-components';

export const FooterBox = styled.footer`
  padding: 1.5em 3em;
  width: inherit;
  background: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.fcLight};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'description social'
    'line line'
    'copy copy';
  align-items: center;
  grid-gap: 1.5em;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'description'
      'social'
      'line'
      'copy';
  }

  p {
    text-align: center;
  }
`;

export const SocialArea = styled.div`
  grid-area: social;
  display: grid;
  align-items: center;
  justify-items: center;
`;

export const IconBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
`;

export const DescriptionArea = styled.div`
  grid-area: description;
  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CopyrightArea = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-area: copy;
`;

export const Hr = styled.hr`
  grid-area: line;
  width: 100%;
  margin: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.fcULight};
`;
