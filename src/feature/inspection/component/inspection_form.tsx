import React, { useState } from "react";
import { Inspection } from "../model/inspection";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Button, Input, Stack } from "@mui/joy";
import { useCreateInspectionMutation } from "../api/inspection_endpoints";
import { Schedule } from "../../schedule/model/schedule";
import SelectUser from "../../user/component/select_user";
import { User } from "../../user/model/user";

interface InspectionFormProps {
  open: boolean;
  onClose: () => void;
  inspection?: Inspection;
  schedule: Schedule;
}

const InspectionForm: React.FC<InspectionFormProps> = (props) => {
  const [user, setUser] = useState<User | null>(null)
  const [createInspection, { isLoading }] = useCreateInspectionMutation();
  const handleInspectionSubmit = async (data: any) => {
    try {
      await createInspection({
        body: {
          description: data.description,
          scheduleId: props.schedule.id,
          assignedUserId: user?.id,
          createdById: user?.id,
        },
      });
    } catch (e) { }
  };
  return (
    <DefaultDialog
      title={props.inspection ? "Edit Inspection" : "Add Inspection"}
      description={`you are editing inspection list from ${props?.schedule.name}`}
      open={props.open}
      onClose={props.onClose}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          await handleInspectionSubmit(formJson);
          props.onClose();
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Input placeholder="Description" name="description" />
            <SelectUser title="Assign to" setUser={setUser} siteId={props.schedule.siteId} />
            <Button loading={isLoading} type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default InspectionForm;
