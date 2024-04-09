import { WorkItem } from "../model/work_item";
import { Button, Input, Stack } from "@mui/joy";
import {
  useCreateWorkItemMutation,
  useUpdateWorkItemMutation,
} from "../api/work_item_endpoints";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Schedule } from "../../schedule/model/schedule";
import { useState } from "react";
import { Lookup, LookupType } from "../../lookup/model/lookup";
import SelectLookup from "../../lookup/components/select_lookup";

interface AddWorkItemDialogProps {
  workItem?: WorkItem;
  open: boolean;
  onClose: () => void;
  schedule: Schedule;
}

const WorkItemForm = (props: AddWorkItemDialogProps) => {
  const [unit, setUnit] = useState<Lookup | null>(null);
  const [createWorkItem] = useCreateWorkItemMutation();
  const [updateWorkItem] = useUpdateWorkItemMutation();
  const handleSubmit = async (data: WorkItem) => {
    try {
      if (props.workItem) {
        await updateWorkItem({
          body: {
            id: props.workItem.id,
            name: data.name,
            description: data.description,
            rate: data.rate,
            quantity: data.quantity,
            unit: unit?.id,
          },
        });
        props.onClose();
      } else {
        await createWorkItem({
          body: {
            scheduleId: props.schedule.id,
            name: data.name,
            description: data.description,
            rate: data.rate,
            quantity: data.quantity,
            unit: unit?.id,
          },
        });
      }
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DefaultDialog
      open={props.open}
      onClose={props.onClose}
      title="Create New Work Item"
      description={`Create work item for ${props.schedule.name}`}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          handleSubmit(formJson as WorkItem);
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Input size="sm" placeholder="Name" name="name" required />
            <Input size="sm" placeholder="Description" name="description" required />
            <SelectLookup lookupType={LookupType.UnitOfMeasure} setLookup={setUnit} lookup={unit} title="Unit of meausre" />
            <Input
              placeholder="Quantity"
              name="quantity"
              required
              type="number"
              size="sm"
            />
            <Input size="sm" placeholder="Rate" name="rate" required type="number" />
            <Input size="sm" placeholder="Amount" name="amount" required type="number" />
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default WorkItemForm;
