import { useState } from 'react';
import Head from 'next/head';
import DataPage from '../components/pageContents/DataPage';
import FileUploader from '../components/pageContents/FileUploader';
import { CenteredGridWrapper, MainWrapper } from '../components/util';

export default function Home() {
  const [streamingHistory, setStreamingHistory] = useState([]);
  const [userIdentity, setUserIdentity] = useState(null);
  const [userData, setUserdata] = useState(null);
  const [processingFinished, setProcessingFinished] = useState(false);

  return (
    <MainWrapper>
      <Head>
        <title>{`Visualisify - ${
          processingFinished ? 'My Stats' : 'Upload Data'
        }`}</title>
      </Head>
      <CenteredGridWrapper>
        {!processingFinished ? (
          <FileUploader
            setStreamingHistory={setStreamingHistory}
            setUserIdentity={setUserIdentity}
            setUserData={setUserdata}
            setProcessingFinished={setProcessingFinished}
          />
        ) : (
          <DataPage
            streamingHistory={streamingHistory}
            userIdentity={userIdentity}
            userData={userData}
          />
        )}
      </CenteredGridWrapper>
    </MainWrapper>
  );
}
