export default function FileProcessor({ setFileTransferComplete }) {
  return (
    <>
      <h1>Step 2: Process Files</h1>
      <h2>Files have been loaded!</h2>
      <button onClick={() => setFileTransferComplete(true)}>
        Process Files
      </button>
    </>
  );
}
