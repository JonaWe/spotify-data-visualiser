import { useState } from 'react';
import Datapage from '../components/pageContents/Datapage';
import FileUploader from '../components/pageContents/FileUploader';
import { CenterdGridWrapper, MainWrapper } from '../components/util';

export default function Home() {
  const [streamingHistory, setStreamingHistory] = useState([]);
  const [userIdentity, setUserIdentity] = useState(null);
  const [userData, setUserdata] = useState(null);
  const [processingFinished, setProcessingFinished] = useState(false);

  return (
    <MainWrapper>
      <CenterdGridWrapper>
        {!processingFinished ? (
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
