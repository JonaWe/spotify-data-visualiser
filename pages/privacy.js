import styled from 'styled-components';
import Link from 'next/link';
import {
  Button,
  CenterdGridWrapper,
  MainWrapper,
  Title,
} from '../components/util';

const Text = styled.p`
  font-size: 1.2em;
  text-align: center;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.accentColor};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TextWrapper = styled.div`
  width: 65vw;
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;

export default function Home() {
  return (
    <MainWrapper>
      <CenterdGridWrapper>
        <Title>Privacy</Title>
        <TextWrapper>
          <Text>
            From the beginning of the project, the protection of personal data
            was extremely important to me. That is why I have built this website
            in such a way that the data is not sent over the internet at any
            time.
            <br />
            <br />
            All data processing is done locally on the particular computer that
            is accessing the website. Thus, to the best of my knowledge, there
            is no possibility of the data being transmitted to a third party.
            <br />
            <br />
            The{' '}
            <a
              href="https://github.com/JonaWe/spotify-data-visualiser"
              target="_blank"
            >
              source code
            </a>{' '}
            of this website can be found on GitHub, so that everyone can verify
            my claims.
          </Text>
        </TextWrapper>
        <Link href="/analysis">
          <Button primary>Back to Analysis</Button>
        </Link>
      </CenterdGridWrapper>
    </MainWrapper>
  );
}
