import Link from 'next/link';
import {
  Button,
  CenterdGridWrapper,
  MainWrapper,
  Title,
  Card,
  CardTitle,
  CardDescription,
  CardWrapper,
} from '../components/util';

export default function Home() {
  return (
    <MainWrapper>
      <Title>Spotify User Data Visualizer</Title>
      <CenterdGridWrapper>
        <CardWrapper>
          <Card>
            <CardTitle>Step 1</CardTitle>
            <CardDescription>
              First you need to request to download your data from Spotify.
              <br />
              <br />
              <a
                href="https://www.spotify.com/us/account/privacy/"
                target="_blank"
              >
                Here
              </a>{' '}
              is a link that will direct you to Spotifys privacy page where you
              can request to download the data.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Step 2</CardTitle>
            <CardDescription>
              Wait until Spotify sends you an email with a download link for
              your data.
              <br />
              <br />
              Download your data from the provided link.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Step 3</CardTitle>
            <CardDescription>
              Once you have downloaded your data you can start analyzing it.
            </CardDescription>
            <Link href="/analysis">
              <Button primary>Start Analysis</Button>
            </Link>
          </Card>
        </CardWrapper>
        <Link href="/demo">
          <Button primary>View Demodata</Button>
        </Link>
      </CenterdGridWrapper>
    </MainWrapper>
  );
}
