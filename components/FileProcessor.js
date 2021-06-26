export default function FileProcessor({ setFileTransferComplete }) {
  const processFiles = () => {
    setFileTransferComplete(true);
  };
  return (
    <>
      <h1>Step 2: Process Files</h1>
      <h2>Files have been loaded!</h2>
      <button onClick={() => processFiles()}>Process Files</button>
    </>
  );
}
