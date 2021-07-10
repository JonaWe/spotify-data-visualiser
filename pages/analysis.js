import { useState } from 'react';

import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

import {
  CenterdGridWrapper,
  MainWrapper,
  Title,
  MainContent,
} from '../components/util';
import Datapage from '../components/pageContents/Datapage';

export default function Home() {
  const [streamingHistory, setStreamingHistory] = useState([]);
  const [userIdentity, setUserIdentity] = useState(null);
  const [userData, setUserdata] = useState(null);
  const [processingFinished, setProcessingFinished] = useState(false);

  return (
    <MainWrapper>
      <CenterdGridWrapper>
        {streamingHistory.length === 0 || !processingFinished ? (
          <FileUploader
            setStreamingHistory={setStreamingHistory}
            setUserIdentity={setUserIdentity}
            setUserdata={setUserdata}
            setProcessingFinished={setProcessingFinished}
          />
        ) : (
          <Datapage
            streamingHistory={streamingHistory}
            userIdentity={userIdentity}
            userData={userData}
          />
        )}
      </CenterdGridWrapper>
    </MainWrapper>
  );
}
