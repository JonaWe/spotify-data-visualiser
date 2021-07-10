import Link from 'next/link';
import DataViews from '../dataViews';
import {
  CenterdGridWrapper,
  MainWrapper,
  Title,
  MainContent,
  Button,
} from '../util';

export default function Datapage({ streamingHistory, userIdentity, userData }) {
  return (
    <MainWrapper>
      <CenterdGridWrapper>
        <Title>Your Spotify Stats for the Past Year</Title>
        <MainContent>
          <DataViews
            streamingHistory={streamingHistory}
            userIdentity={userIdentity}
            userData={userData}
          />
        </MainContent>
        <Link href="/">
          <Button primary>Go Home</Button>
        </Link>
      </CenterdGridWrapper>
    </MainWrapper>
  );
}
