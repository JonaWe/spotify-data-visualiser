import { useState } from 'react';

import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

import styled from 'styled-components';
import { CenterdGridWrapper, MainWrapper, Title } from '../components/util';

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
            streamingHistory={streamingHistory}
            userData={userData}
            userIdentity={userIdentity}
          />
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
      </CenterdGridWrapper>
    </MainWrapper>
  );
}