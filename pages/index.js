import { useState } from 'react';

import FileProcessor from '../components/FileProcessor';
import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

import styled from 'styled-components';

const Main = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.fcPrimary};
`;

export default function Home() {
  const [streamingHistory, setStreamingHistory] = useState([]);
  const [userIdentity, setUserIdentity] = useState(null);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);
  const [userData, setUserdata] = useState(false);

  return (
    <Main>
      {streamingHistory.length === 0 ? (
        <FileUploader
          setStreamingHistory={setStreamingHistory}
          setUserIdentity={setUserIdentity}
          setUserdata={setUserdata}
        />
      ) : !fileTransferComplete ? (
        <FileProcessor setFileTransferComplete={setFileTransferComplete} />
      ) : (
        <DataViews
          streamingHistory={streamingHistory}
          userIdentity={userIdentity}
          userData={userData}
        />
      )}
    </Main>
  );
}
