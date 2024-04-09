import React from "react";
import { WorkItem } from "../../work_item/model/work_item";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Button, Input, Stack, Textarea } from "@mui/joy";
import { Schedule } from "../model/schedule";

interface WorkItemFormProps {
  open: boolean;
  onClose: () => void;
  workItem?: WorkItem;
  schedule: Schedule;
}

const WorkItemForm: React.FC<WorkItemFormProps> = (props) => {
  const handleWorkItem = async (workItem: any) => {
    try {
    } catch (e) {}
  };
  return (
    <DefaultDialog
      title={props.workItem ? "Edit Work Item" : "Add Work Item"}
      description=""
      open={props.open}
      onClose={props.onClose}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          handleWorkItem(formJson);
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Input placeholder="Name" name="name" />
            <Input placeholder="Unit" name="name" />
            <Input placeholder="Quantity" name="name" />
            <Input placeholder="Rate" name="name" />
            <Textarea
              placeholder="Description"
              name="description"
              minRows={3}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default WorkItemForm;
