import { useState } from 'react';

import FileProcessor from '../components/FileProcessor';
import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

import styled from 'styled-components';

const MainWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.fcPrimary};
`;

const MainContent = styled.div`
  width: 70vw;
  background-color: ${(props) => props.theme.bgSecondary};
  margin: 20vh 0;
  padding: 5em;
  border-radius: 2em;
  display: grid;
  align-items: center;
  justify-items: center;
`;

export default function Home() {
  const [streamingHistory, setStreamingHistory] = useState([]);
  const [userIdentity, setUserIdentity] = useState(null);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);
  const [userData, setUserdata] = useState(false);

  return (
    <MainWrapper>
      {streamingHistory.length === 0 ? (
        <FileUploader
          setStreamingHistory={setStreamingHistory}
          setUserIdentity={setUserIdentity}
          setUserdata={setUserdata}
        />
      ) : !fileTransferComplete ? (
        <FileProcessor setFileTransferComplete={setFileTransferComplete} />
      ) : (
        <MainContent>
          <DataViews
            streamingHistory={streamingHistory}
            userIdentity={userIdentity}
            userData={userData}
          />
        </MainContent>
      )}
    </MainWrapper>
  );
}
