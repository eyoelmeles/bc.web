import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useCreateFileMutation,
  useUpdateFileMutation,
} from "../api/files_endpoints";
import { FileModel } from "../model/file";
import { Folder as MiuFolder } from "@mui/icons-material";
import AddFilesDropZone from "../../../core/utils/drop_zone";
import { Folder } from "../model/folder";

interface AddFileDialogProps {
  file?: FileModel;
  folder: Folder;
  open: boolean;
  onClose: () => void;
}

const AddFile = (props: AddFileDialogProps) => {
  const [name, setName] = useState(props?.file?.file ?? "");
  const [file, setFile] = useState<File | undefined>();

  const [createFile] = useCreateFileMutation();
  const [updateFile] = useUpdateFileMutation();
  const handleAddSite = async () => {
    try {
      if (props.file) {
        // await updateFile({
        //   body: {
        //     id: props.file.id,
        //     file,
        //   },
        // });
      } else {
        await createFile({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: {
            fileName: name,
            folderId: props.folder.id,
            file,
          },
        });
      }
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const breadcrumbs = [
    <MiuFolder key="1" />,
    <Typography key={"2"}>{props.folder.name}</Typography>,
  ];

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.file ? "Edit File" : "Add File"}</DialogTitle>
      <DialogContent>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
        <Stack spacing={2}>
          <Divider />
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AddFilesDropZone setFile={setFile} file={file} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddSite} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFile;
