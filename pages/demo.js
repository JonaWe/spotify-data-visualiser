import Datapage from '../components/pageContents/Datapage';

export default function Home({ streamingHistory, userIdentity, userData }) {
  return (
    <Datapage
      streamingHistory={streamingHistory}
      userIdentity={userIdentity}
      userData={userData}
    />
  );
}

export async function getStaticProps() {
  // TODO add real demo data
  return {
    props: {
      streamingHistory: [
        {
          endTime: '2021-07-10 22:29',
          artistName: 'Artist',
          trackName: 'Track',
          msPlayed: 180_000,
        },
      ],
      userIdentity: null,
      userData: { username: 'Username' },
    },
  };
}
