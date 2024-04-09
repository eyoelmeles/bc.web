import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type UploadedFile = {
  link: string;
};

interface ImageUploadProps {
  onImageChange: (file: File, binaryStr: ArrayBuffer | null) => void;
  previouslyUploaded?: string[]; // Just an array of URLs now
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, previouslyUploaded = [] }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

//   useEffect(() => {
//     const previousFiles: UploadedFile[] = previouslyUploaded.map(url => ({ link: url }));
//     setUploadedFiles(prevFiles => [...prevFiles, ...previousFiles]);
//   }, [previouslyUploaded]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result as ArrayBuffer;
        setUploadedFiles((prevFiles) => [...prevFiles, { link: URL.createObjectURL(file) }]);
        onImageChange(file, binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{padding: 2, border: '1px dashed #ccc', borderRadius: 8}}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <div>
        <h5>Files:</h5>
        <ul>
            {previouslyUploaded?.map((previouslyUploaded: string, index: number) => 
            <li key={index}>
                <img src={previouslyUploaded} alt={`Uploaded file ${index}`} style={{ maxWidth: '100px' }} />
            </li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
