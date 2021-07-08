import styled from 'styled-components';

import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import SocialLink from './SocialLink';

const FooterBox = styled.footer`
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

const SocialArea = styled.div`
  grid-area: social;
  display: grid;
  align-items: center;
  justify-items: center;
`;

const IconBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
`;

const DescriptionArea = styled.div`
  grid-area: description;
  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CopyrightArea = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-area: copy;
`;

const Hr = styled.hr`
  grid-area: line;
  width: 100%;
  margin: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.fcULight};
`;

export default function Footer() {
  return (
    <FooterBox>
      <SocialArea>
        <IconBox>
          <SocialLink href="https://github.com/JonaWe" icon={faGithub} />
          <SocialLink
            href="https://twitter.com/JonaWessendorf"
            icon={faTwitter}
          />
        </IconBox>
      </SocialArea>
      <DescriptionArea>
        <p>
          If you are curious how I created this website, check out the source
          code on{' '}
          <a
            href="https://github.com/JonaWe/spotify-data-visualiser"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </DescriptionArea>
      <Hr />
      <CopyrightArea>
        <p>&copy; 2021 Jona Wessendorf</p>
      </CopyrightArea>
    </FooterBox>
  );
}
