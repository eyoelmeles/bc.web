import { WarningRounded } from "@mui/icons-material";
import {
  Modal,
  Button,
  ModalDialog,
  Divider,
  ModalClose,
  Typography,
  Stack,
  Box,
} from "@mui/joy";
import React, { Dispatch, FC, SetStateAction } from "react";

interface DeleteModalProps {
  title: string;
  warningText: string;
  onDelete: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DeleteModal: FC<DeleteModalProps> = (props) => {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            padding={1}
            alignItems="flex-start"
            justifyContent="flex-start"
            gap={1}
          >
            <WarningRounded />
            <Typography level="h4">{props.title}</Typography>
          </Box>
          <ModalClose />
        </Box>
        <Divider />
        <Box padding={2}>
          <Typography>{props.warningText}</Typography>
        </Box>
        <Stack spacing={1} direction="row" alignSelf="flex-end">
          <Button
            variant="plain"
            color="neutral"
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={async () => {
              await props.onDelete();
              props.setOpen(false);
            }}
          >
            Delete
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
