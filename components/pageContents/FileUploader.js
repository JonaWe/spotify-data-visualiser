import JSZip from 'jszip';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Loader from 'react-loader-spinner';
import { ThemeContext } from 'styled-components';
import {
  DragZone,
  HighlightedCardDescription,
  Title,
  UploadCard,
  UploadCardDescription,
  UploadCardTitle,
} from '../util';

export default function FileUploader({
  setStreamingHistory,
  setUserIdentity,
  setUserdata,
  setProcessingFinished,
}) {
  const theme = useContext(ThemeContext);
  const [failed, setFailed] = useState(false);
  const onDrop = useCallback(async ([acceptedFile]) => {
    if (!acceptedFile) return;

    setFailed(false);

    let zip;
    try {
      zip = await JSZip.loadAsync(acceptedFile);
    } catch {
      setFailed(true);
      return;
    }

    const streamingHistoryPromises = [];
    let userIdentityPromise;
    let userDataPromise;

    zip.forEach((_, zipEntry) => {
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
    let userIdentity;
    if (userIdentityPromise)
      userIdentity = JSON.parse(await userIdentityPromise);
    let userData;
    if (userDataPromise) userData = JSON.parse(await userDataPromise);

    if (streamingHistory && (userIdentityPromise || userDataPromise)) {
      if (userIdentity) setUserIdentity(userIdentity);
      if (userData) setUserdata(userData);
      setStreamingHistory(streamingHistory);
      setProcessingFinished(true);
    } else {
      setFailed(true);
    }
  });

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      noKeyboard: true,
      maxFiles: 1,
      onDrop,
      accept: '.zip',
      maxSize: 30_000_000,
    });

  if (acceptedFiles.length !== 0 && !failed)
    return (
      <Loader
        type="ThreeDots"
        color={theme.accentColor}
        height={100}
        width={100}
      />
    );

  return (
    <>
      <Title>Spotify User Data Visualizer</Title>
      <UploadCard>
        <UploadCardTitle>File Transfer Pending</UploadCardTitle>
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
        <>
          {(fileRejections.length !== 0 || failed) && (
            <UploadCardDescription>
              {failed ? (
                <>
                  <HighlightedCardDescription warning>
                    The content of the zip file is invalid!
                  </HighlightedCardDescription>
                  <br />
                  This usually means that you have selected the wrong file.
                </>
              ) : (
                <>
                  <HighlightedCardDescription warning>
                    Failed to Load:
                  </HighlightedCardDescription>
                  <br />
                  {fileRejections.map(
                    ({ file: { name: fileName }, errors: [{ message }] }) => (
                      <span key={fileName}>
                        <HighlightedCardDescription>
                          {fileName}
                        </HighlightedCardDescription>{' '}
                        - {message}
                        <br />
                      </span>
                    )
                  )}
                </>
              )}
            </UploadCardDescription>
          )}
          <DragZone {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Click anywhere or drag 'n' drop to load the userdata zip file</p>
          </DragZone>
        </>
      </UploadCard>
    </>
  );
}
