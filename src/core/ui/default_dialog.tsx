import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { ModalClose } from "@mui/joy";

interface DefaultDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const DefaultDialog: React.FC<React.PropsWithChildren<DefaultDialogProps>> = (
  props
) => {
  const handleClose = () => {
    props.onClose();
  };
  return (
    <Modal open={props.open} onClose={handleClose}>
      <ModalDialog
        aria-labelledby="generic-modal-dialog-title"
        aria-describedby="generic-modal-dialog-description"
      >
        <ModalClose />
        <Typography id="generic-modal-dialog-title" level="h2">
          {props.title}
        </Typography>
        <Typography id="generic-modal-dialog-description" color="neutral">
          {props.description}
        </Typography>
        {props.children}
      </ModalDialog>
    </Modal>
  );
};

export default DefaultDialog;
