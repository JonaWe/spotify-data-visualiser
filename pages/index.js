import { useState } from 'react';

import FileProcessor from '../components/FileProcessor';
import FileUploader from '../components/FileUploader';
import DataViews from '../components/dataViews';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [fileTransferComplete, setFileTransferComplete] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {history.length === 0 ? (
        <FileUploader setHistory={setHistory} />
      ) : !fileTransferComplete ? (
        <FileProcessor setFileTransferComplete={setFileTransferComplete} />
      ) : (
        <DataViews rawData={history} />
      )}
    </div>
  );
}
