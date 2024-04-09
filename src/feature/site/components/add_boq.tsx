import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCreateSiteMutation,
  useUpdateSiteMutation,
} from "../api/site_endpoints";
import { SiteModel } from "../model/site";
import SiteLocation from "./site_location";
import AddFilesDropZone from "../../../core/utils/drop_zone";
import { Select } from "@mui/joy";
import { KeyboardArrowDown } from "@mui/icons-material";

interface AddCreatBOQProps {
  site?: SiteModel;
  open: boolean;
  onClose: () => void;
}

const CreatBOQ = (props: AddCreatBOQProps) => {
  const [name, setName] = useState(props?.site?.name ?? "");
  const [owner, setOwner] = useState(props?.site?.owner ?? "");
  const [longitude, setLongitude] = useState(props?.site?.longitude ?? "");
  const [latitude, setLatitude] = useState(props?.site?.latitude ?? "");
  const [createSite] = useCreateSiteMutation();
  const [updateSite] = useUpdateSiteMutation();
  const handleAddBOQ = async () => {
    //   try {
    //     if (props.site) {
    //       await updateSite({
    //         body: {
    //           id: props.site.id,
    //           name,
    //           owner,
    //           longitude: parseInt(longitude.toString()),
    //           latitude: parseInt(latitude.toString()),
    //         },
    //       });
    //     } else {
    //       await createSite({
    //         body: {
    //           name,
    //           owner,
    //           longitude: sitePosition[1],
    //           latitude: sitePosition[0],
    //         },
    //       });
    //     }
    //     props.onClose();
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.site ? "Edit Site" : "Add Site"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddBOQ} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatBOQ;
