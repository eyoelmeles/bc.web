import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Folder } from "../model/folder";
import {
  useCreateFolderMutation,
  useUpdateFolderMutation,
} from "../api/files_endpoints";
import useUserData from "../../../core/auth/hooks/useUserData";
import { useSelector } from "react-redux";

interface AddFolderDialogProps {
  folder?: Folder;
  open: boolean;
  onClose: () => void;
}

const AddFolder = (props: AddFolderDialogProps) => {
  const site = useSelector((state: any) => state.site);
  const [name, setName] = useState(props?.folder?.name ?? "");
  const [siteId, setSiteId] = useState<string | undefined>(undefined);

  // const [sites, set]
  const [createFolder] = useCreateFolderMutation();
  const [updateSite] = useUpdateFolderMutation();
  const [data] = useUserData();
  const handleAddSite = async () => {
    try {
      if (props.folder) {
        await updateSite({
          body: {
            id: props.folder.id,
            name,
          },
        });
      } else {
        await createFolder({
          body: {
            name,
            siteId: site?.id,
          },
        });
      }
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSiteChange = (event: any) => {
    setSiteId(event.target.files[0]);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.folder ? "Edit Folder" : "Add Folder"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Assign Role</InputLabel>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={siteId}
            label="Assign Role"
            startAdornment={
              isLoading ? (
                <InputAdornment position="end">
                  <CircularProgress />
                </InputAdornment>
              ) : null
            }
            onChange={handleSiteChange}
          >
            {roles?.map((role: any) => (
              <MenuItem value={role.id}>{role.name}</MenuItem>
            ))} 
          </Select>
          */}
        </FormControl>
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

export default AddFolder;
