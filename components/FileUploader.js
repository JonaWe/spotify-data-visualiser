import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

export default function FileUploader({ setHistory }) {
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
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Click or drag 'n' drop to load a file</p>
      </div>
    </>
  );
}
