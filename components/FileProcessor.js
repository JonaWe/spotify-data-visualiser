import { Button } from './util';

export default function FileProcessor({ setFileTransferComplete }) {
  return (
    <div style={{ height: '100vh', textAlign: 'center' }}>
      <h1>Step 2: Process Files</h1>
      <h2>Files have been loaded!</h2>
      <Button onClick={() => setFileTransferComplete(true)} primary>
        Process Files
      </Button>
    </div>
  );
}
