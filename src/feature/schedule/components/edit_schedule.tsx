import { Stack } from "@mui/material";
import { Button, FormLabel, Input, Radio, Textarea } from "@mui/joy";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Schedule } from "../model/schedule";
import { useUpdateScheduleMutation } from "../api/schedule_endpoint";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { format, parseISO } from "date-fns";

interface EditScheduleProps {
  schedule?: Schedule;
  selectedSchedule: Schedule;
  open: boolean;
  onClose: () => void;
}

const EditSchedule = (props: EditScheduleProps) => {
  const [status, setStatus] = useState<boolean>(props.selectedSchedule?.status);
  const [fromDate, setFromDate] = useState<Date | null>(props?.selectedSchedule?.fromDate ? parseISO(props.selectedSchedule?.fromDate) : null);
  const [toDate, setToDate] = useState<Date | null>(props?.selectedSchedule?.toDate ? parseISO(props.selectedSchedule?.toDate) : null);
  const [updateSchedule] = useUpdateScheduleMutation();
  const handleLookup = async (data: any) => {
    try {
      await updateSchedule({
        body: {
          id: props.schedule?.id,
          name: data.name,
          description: data.description,
          fromDate: data.fromDate,
          toDate: data.toDate,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

    const handleStatusChange = () => {
      setStatus(status => !status);
    };

  return (
    <DefaultDialog
      open={props.open}
      onClose={props.onClose}
      title="Update Schedule"
      description={`The schedule will be created inside ${props.selectedSchedule?.name}`}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          handleLookup(formJson);
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Input
              placeholder="Name"
              name="name"
              value={props.selectedSchedule?.name}
            />
            <DatePicker
              label="From"
              value={fromDate ?? new Date() }
              onChange={(val: Date | null) => {
                if (val)
                setFromDate(val)
              }}
              slotProps={{
                textField: (ownerState) => ({
                  size: "small",
                }),
              }}
            />
            <DatePicker
              label="To"
              value={toDate ?? new Date()}
              onChange={(val: Date | null) => {
                if (val)
                setToDate(val)
              }}
              slotProps={{
                textField: (ownerState) => ({
                  size: "small",
                }),
              }}
            />
            <FormLabel>Status</FormLabel>
            <Stack spacing={2} direction="row">
              <Radio
                // checked={selectedValue === "a"}
                onChange={handleStatusChange}
                checked={status}
                value="a"
                name="radio-buttons"
                label="Active"
                slotProps={{ input: { "aria-label": "A" } }}
              />
              <Radio
                checked={!status}
                onChange={handleStatusChange}
                value="b"
                name="radio-buttons"
                label="In Active"
                slotProps={{ input: { "aria-label": "B" } }}
              />
            </Stack>
            <Textarea
              minRows={3}
              placeholder="Description"
              name="description"
              value={props.selectedSchedule?.description}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default EditSchedule;
