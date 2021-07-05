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
  width: 80vw;
  background-color: ${(props) => props.theme.bgSecondary};
  margin-bottom: 15vh;
  border-radius: 2em;
  display: grid;
  align-items: center;
  justify-items: center;

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  margin: 17vh 0;
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
        <>
          <Title>Your Spotify Stats for the Past Year</Title>
          <MainContent>
            <DataViews
              streamingHistory={streamingHistory}
              userIdentity={userIdentity}
              userData={userData}
            />
          </MainContent>
        </>
      )}
    </MainWrapper>
  );
}
