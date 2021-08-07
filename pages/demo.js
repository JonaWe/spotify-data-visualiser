import Head from 'next/head';
import Datapage from '../components/pageContents/Datapage';
import { getDemoData } from '../lib/getDemoData';

export default function Home({ streamingHistory, userIdentity, userData }) {
  return (
    <>
      <Head>
        <title>Visualisify - Demo</title>
      </Head>
      <Datapage
        streamingHistory={streamingHistory}
        userIdentity={userIdentity}
        userData={userData}
      />
    </>
  );
}

export async function getStaticProps() {
  const demoData = getDemoData();
  return {
    props: {
      streamingHistory: demoData,
      userIdentity: null,
      userData: { username: 'Username' },
    },
  };
}
