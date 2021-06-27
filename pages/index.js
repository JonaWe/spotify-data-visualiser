import { useState } from 'react';

import FileProcessor from '../components/FileProcessor';
import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

export default function Home() {
  const [streamingHistory, setStreamingHistory] = useState([]);
  const [userIdentity, setUserIdentity] = useState(null);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {streamingHistory.length === 0 ? (
        <FileUploader
          setStreamingHistory={setStreamingHistory}
          setUserIdentity={setUserIdentity}
        />
      ) : !fileTransferComplete ? (
        <FileProcessor setFileTransferComplete={setFileTransferComplete} />
      ) : (
        <DataViews
          streamingHistory={streamingHistory}
          userIdentity={userIdentity}
        />
      )}
    </div>
  );
}
