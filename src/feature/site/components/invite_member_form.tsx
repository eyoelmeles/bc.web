import React from "react";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Autocomplete, Button, Stack } from "@mui/joy";
import { Email, Search } from "@mui/icons-material";

interface InviteMemberFormProps {
  // lookup?: Role;
  // lookupType: number;
  open: boolean;
  onClose: () => void;
  role: string | null;
  roleIndex: number;
}

const InviteMemberForm: React.FC<InviteMemberFormProps> = (props) => {
  return (
    <DefaultDialog
      open={props.open}
      onClose={props.onClose}
      title="Invite Member"
      description={`For ${props.role} role`}
    >
      <form
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   const formData = new FormData(event.currentTarget);
      //   const formJson = Object.fromEntries((formData as any).entries());
      //   handleLookup(formJson);
      // }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Autocomplete
              variant="outlined"
              slotProps={{
                listbox: {
                  variant: "outlined",
                },
              }}
              multiple
              placeholder="Enter email address"
              startDecorator={<Email />}
              options={[]}
            />
            <Button type="submit">Invite Member</Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default InviteMemberForm;
