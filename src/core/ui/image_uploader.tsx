import { Avatar } from "@mui/material";
import React, { useRef } from "react";

interface ImageUploaderProps {
  image?: string | null;
  setImage: (image: string | null) => void;
  setSelectedFile: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  setImage,
  setSelectedFile,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
        setSelectedFile(file); // Set the actual file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        accept="image/*"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
      <Avatar
        src={image || undefined}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        variant="rounded"
        sx={{width: 100, height: 100}}
      />
    </div>
  );
};

export default ImageUploader;
