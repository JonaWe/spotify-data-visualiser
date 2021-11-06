import { useEffect } from 'react';
import Link from 'next/link';
import DataViews from '../dataViews';
import {
  Button,
  CenterdGridWrapper,
  MainContent,
  MainWrapper,
  Title,
} from '../util';
import HistoryItem from '../../lib/Types/HistoryItem';
import UserIdentity from '../../lib/Types/UserIdentity';
import UserData from '../../lib/Types/UserData';

interface DataPageProps {
  streamingHistory: HistoryItem[];
  userIdentity?: UserIdentity;
  userData: UserData;
}

export default function DataPage({
  streamingHistory,
  userIdentity,
  userData,
}: DataPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
