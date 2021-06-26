import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

export default function FileUploader({ setStreamingHistory }) {
  const onDrop = useCallback((acceptedFiles) => {
    const rawStreamingHistory = [];

    acceptedFiles.forEach(async (file) => {
      const zip = await JSZip.loadAsync(file);
      zip.forEach(async (relativePath, zipEntry) => {
        if (/StreamingHistory[0-9]+.json/.test(zipEntry.name)) {
          const jsonText = await zipEntry.async('text');
          const streamingHistoryPart = JSON.parse(jsonText);
          rawStreamingHistory.push(...streamingHistoryPart);
          setStreamingHistory(rawStreamingHistory);
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
    <div
      style={{ height: '100vh' }}
      {...getRootProps({ className: 'dropzone' })}
    >
      <input {...getInputProps()} />
      <h1>Step 1: Load a file</h1>
      <p>Click anywhere or drag 'n' drop to load a file</p>
    </div>
  );
}
