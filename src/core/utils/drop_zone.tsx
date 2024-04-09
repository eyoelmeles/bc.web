import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Close, FileDownload } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/joy";
import { formatBytes } from "./format_bytes";

interface AddFilesDropZoneProps {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function AddFilesDropZone(props: AddFilesDropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      props.setFile(file);
      setFiles((prevFiles) => [...prevFiles, file]);
    },
    [props.setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.divider,
              padding: 2,
              border: `1px dashed ${theme.palette.primary}`,
              display: "flex",
              gap: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <Stack direction="row" spacing={1}>
              <FileDownload
                sx={(theme) => ({ color: theme.palette.primary.light })}
              />
              <Typography
                level="body-lg"
                sx={(theme) => ({ color: theme.palette.primary })}
              >
                Upload files
              </Typography>
            </Stack>
            <Typography
              level="body-md"
              sx={(theme) => ({ color: theme.palette.primary })}
            >
              Drop the files here ..
            </Typography>
          </Box>
        )}
      </div>
      {files.map((file, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            backgroundColor: theme.palette.divider,
            padding: 2,
            border: `1px dashed ${theme.palette.primary}`,
            display: "flex",
            gap: 1,
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            margin: 2,
          })}
        >
          <Stack
            direction="row"
            display="flex"
            spacing={1}
            alignSelf="start"
            alignItems="start"
            justifyContent="start"
          >
            <FileDownload
              sx={(theme) => ({ color: theme.palette.primary.light })}
            />
            <Typography
              level="body-lg"
              sx={(theme) => ({ color: theme.palette.primary })}
            >
              {file.name}
            </Typography>
          </Stack>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Stack spacing={1}>
              <Typography
                level="body-md"
                sx={(theme) => ({ color: theme.palette.primary })}
              >
                File type: {file.type || "Unknown"}
              </Typography>
              <Typography
                level="body-md"
                sx={(theme) => ({ color: theme.palette.primary })}
              >
                File Size: {formatBytes(file.size)}
              </Typography>
            </Stack>
            <IconButton
              onClick={() => {
                setFiles((prevFiles) =>
                  prevFiles.filter((_, i) => i !== index)
                );
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      ))}
    </div>
  );
}
