import { useState } from 'react';

import FileProcessor from '../components/FileProcessor';
import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);

  return (
    <>
      {history.length === 0 ? (
        <FileUploader setHistory={setHistory} />
      ) : !fileTransferComplete ? (
        <FileProcessor setFileTransferComplete={setFileTransferComplete} />
      ) : (
        <DataViews rawData={history} />
      )}
    </>
  );
}
