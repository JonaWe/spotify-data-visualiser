export default function FileProcessor({ setFileTransferComplete }) {
  const processFiles = () => {
    setFileTransferComplete(true);
  };
  return (
    <>
      <h1>Files loaded</h1>
      <button onClick={() => processFiles()}>Process</button>
    </>
  );
}
