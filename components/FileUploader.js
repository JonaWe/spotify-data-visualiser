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
  const onDrop = useCallback((acceptedFiles) => {
    setFailed(false);
    const rawStreamingHistory = [];

    acceptedFiles.forEach(async (file) => {
      const zip = await JSZip.loadAsync(file);
      zip.forEach(async (relativePath, zipEntry) => {
        if (/StreamingHistory[0-9]+.json$/.test(zipEntry.name)) {
          const jsonText = await zipEntry.async('text');
          const streamingHistoryPart = JSON.parse(jsonText);
          rawStreamingHistory.push(...streamingHistoryPart);
          setStreamingHistory(rawStreamingHistory);
        } else if (/Identity.json$/.test(zipEntry.name)) {
          setUserIdentity(JSON.parse(await zipEntry.async('text')));
        } else if (/Userdata.json$/.test(zipEntry.name)) {
          setUserdata(JSON.parse(await zipEntry.async('text')));
        }
      });
    });
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
