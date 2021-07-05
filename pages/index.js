import Link from 'next/link';
import {
  Button,
  CenterdGridWrapper,
  MainWrapper,
  Title,
} from '../components/util';

export default function Home() {
  return (
    <MainWrapper>
      <Title>Spotify User Data Visualizer</Title>
      <CenterdGridWrapper>
        <Link href="/analysis">
          <Button primary>Analyse</Button>
        </Link>
      </CenterdGridWrapper>
    </MainWrapper>
  );
}
