import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import WeekdaysRadarChart from '../components/WeekdaysRadarChart';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const zip = await JSZip.loadAsync(file);
      zip.forEach(async (relativePath, zipEntry) => {
        if (/StreamingHistory[0-9]+.json/.test(zipEntry.name)) {
          // TODO the appending of the list does not work for some reason
          const jsonText = await zipEntry.async('text');
          const historyPart = JSON.parse(jsonText);
          const newH = history.concat(historyPart);
          console.log(newH.length);
          setHistory(newH);
        }
      });
    });
    console.log('file transfer complete');
    setFileTransferComplete(true);
  });

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noKeyboard: true,
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <p>{history.length}</p>
      {history.length === 0 ? (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Click or drag 'n' drop to upload a file</p>
        </div>
      ) : !fileTransferComplete ? (
        <h1>Processing</h1>
      ) : (
        <WeekdaysRadarChart rawData={history} />
      )}
    </>
  );
}
