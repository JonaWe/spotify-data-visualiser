import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import TimeslotsRadarChart from '../components/dataViews/TimeslotsRadarChart';
import WeekdaysRadarChart from '../components/dataViews/WeekdaysRadarChart';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);

  const processFiles = () => {
    setFileTransferComplete(true);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const rawDataList = [];

    acceptedFiles.forEach(async (file) => {
      const zip = await JSZip.loadAsync(file);
      zip.forEach(async (relativePath, zipEntry) => {
        if (/StreamingHistory[0-9]+.json/.test(zipEntry.name)) {
          const jsonText = await zipEntry.async('text');
          const historyPart = JSON.parse(jsonText);
          rawDataList.push(...historyPart);
          setHistory(rawDataList);
        }
      });
    });
  });

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noKeyboard: true,
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      {history.length === 0 ? (
        <>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Click or drag 'n' drop to upload a file</p>
          </div>
        </>
      ) : !fileTransferComplete ? (
        <>
          <h1>Files loaded</h1>
          <button onClick={() => processFiles()}>Process</button>
        </>
      ) : (
        <>
          <p>Total tracks played: {history.length}</p>
          <p>
            Total playtime:{' '}
            {(
              history
                .map((data) => {
                  return data.msPlayed;
                })
                .reduce((acc, cur) => cur + acc, 0) /
              1000 /
              60 /
              60
            ).toFixed(1)}
          </p>
          <TimeslotsRadarChart rawData={history} />
          <WeekdaysRadarChart rawData={history} />
        </>
      )}
    </>
  );
}
