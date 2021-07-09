import JSZip from 'jszip';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Button,
  DragZone,
  HighlightedCardDescription,
  Title,
  UploadCard,
  UploadCardDescription,
  UploadCardTitle,
} from './util';

export default function FileUploader({
  setStreamingHistory,
  setUserIdentity,
  setUserdata,
  setProcessingFinished,
  streamingHistory,
  userData,
  userIdentity,
}) {
  const [failed, setFailed] = useState(false);
  const onDrop = useCallback(async ([acceptedFile]) => {
    setFailed(false);

    const zip = await JSZip.loadAsync(acceptedFile);
    const streamingHistoryPromises = [];
    let userIdentityPromise;
    let userDataPromise;

    zip.forEach((relativePath, zipEntry) => {
      const data = zipEntry.async('text');
      if (/StreamingHistory[0-9]+.json$/.test(zipEntry.name)) {
        streamingHistoryPromises.push(data);
      } else if (/Identity.json$/.test(zipEntry.name)) {
        userIdentityPromise = data;
      } else if (/Userdata.json$/.test(zipEntry.name)) {
        userDataPromise = data;
      }
    });

    const streamingHistory = (await Promise.all(streamingHistoryPromises))
      .map((data) => JSON.parse(data))
      .reduce((all, current) => [...all, ...current], []);
    const userIdentity = JSON.parse(await userIdentityPromise);
    const userData = JSON.parse(await userDataPromise);

    if (userIdentity) setUserIdentity(userIdentity);
    if (userData) setUserdata(userData);
    setStreamingHistory(streamingHistory);

    if (streamingHistory && (userIdentityPromise || userDataPromise))
      setProcessingFinished(true);
  });

  const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } =
    useDropzone({
      noKeyboard: true,
      maxFiles: 1,
      onDrop,
      accept: '.zip',
    });

  return (
    <>
      <Title>Spotify User Data Visualizer</Title>
      <UploadCard>
        <UploadCardTitle>
          File Transfer {acceptedFiles.length === 0 ? 'Pending' : 'Complete'}
        </UploadCardTitle>
        <UploadCardDescription>
          Next, you need to upload your Spotify user data to start the analysis.
          <br />
          <HighlightedCardDescription>
            No data is sent{' '}
          </HighlightedCardDescription>
          over the internet and{' '}
          <HighlightedCardDescription>
            everything is processed locally{' '}
          </HighlightedCardDescription>
          on this device.
          <br />
          <br />
          <Link href="/privacy">
            <a>Read more</a>
          </Link>{' '}
          about data protection.
        </UploadCardDescription>
        {acceptedFiles.length === 0 || failed ? (
          <>
            {fileRejections.length !== 0 || failed ? (
              <UploadCardDescription>
                {failed ? (
                  <HighlightedCardDescription warning>
                    The content of the zip file is invalid!
                  </HighlightedCardDescription>
                ) : (
                  <>
                    Failed to Load:
                    <br />
                    {fileRejections.map(
                      ({ file: { name }, errors: [{ message }] }) => (
                        <>
                          <HighlightedCardDescription>
                            {name}
                          </HighlightedCardDescription>{' '}
                          - {message}
                        </>
                      )
                    )}
                  </>
                )}
              </UploadCardDescription>
            ) : null}
            <DragZone {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>
                Click anywhere or drag 'n' drop to load the userdata zip file
              </p>
            </DragZone>
          </>
        ) : (
          <>
            <UploadCardDescription>
              Successfully Loaded:{' '}
              <HighlightedCardDescription>
                {acceptedFiles.map(({ name }) => name)}
              </HighlightedCardDescription>
            </UploadCardDescription>
            <br />
            <Button
              primary
              onClick={() => {
                if (streamingHistory && (userIdentity || userData))
                  setProcessingFinished(true);
                else setFailed(true);
              }}
            >
              Analyse File
            </Button>
          </>
        )}
      </UploadCard>
    </>
  );
}
