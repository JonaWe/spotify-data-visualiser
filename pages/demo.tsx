import Head from 'next/head';
import DataPage from '../components/pageContents/DataPage';
import { getDemoData } from '../lib/getDemoData';
import HistoryItem from '../lib/Types/HistoryItem';
import UserData from '../lib/Types/UserData';
import UserIdentity from '../lib/Types/UserIdentity';

interface DemoPageProps {
  streamingHistory: HistoryItem[];
  userIdentity?: UserIdentity;
  userData?: UserData;
}

export default function Home({
  streamingHistory,
  userIdentity,
  userData,
}: DemoPageProps) {
  return (
    <>
      <Head>
        <title>Visualisify - Demo</title>
      </Head>
      <DataPage
        streamingHistory={streamingHistory}
        userIdentity={userIdentity}
        userData={userData}
      />
    </>
  );
}

// TODO fix any type for getStaticProps
export const getStaticProps: any = async () => {
  const demoData = getDemoData();
  return {
    props: {
      streamingHistory: demoData,
      userIdentity: null,
      userData: { username: 'Username' },
    },
  };
};
