import { Stack } from "@mui/material";
import { Button, FormLabel, Input, Radio, Textarea } from "@mui/joy";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Schedule } from "../model/schedule";
import {
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
} from "../api/schedule_endpoint";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useSelector } from "react-redux";

interface AddScheduleProps {
  schedule?: Schedule;
  selectedSchedule?: Schedule;
  open: boolean;
  onClose: () => void;
}

const AddSchedule = (props: AddScheduleProps) => {
  const site = useSelector((state: any) => state.site);
  // const [status, setStatus] = useState<boolean>()
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const [createSchedule] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const handleLookup = async (data: Schedule) => {
    try {
      await createSchedule({
        body: {
          name: data.name,
          description: data.description,
          fromDate: fromDate?.toISOString(),
          toDate: toDate?.toISOString(),
          siteId: site?.id,
          parentSchedule: props.schedule?.id ?? undefined,
        },
      });
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  //   const handleStatusChange = () => {};

  return (
    <DefaultDialog
      open={props.open}
      onClose={props.onClose}
      title="Create New Schedule"
      description={`The schedule will be created inside ${props.schedule?.name}`}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          handleLookup(formJson as Schedule);
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Input placeholder="Name" name="name" />
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(date) => setFromDate(date)}
              slotProps={{
                textField: (ownerState) => ({
                  size: "small",
                }),
              }}
            />
            <DatePicker
              label="To"
              value={toDate}
              onChange={(date) => setToDate(date)}
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
                // onChange={handleStatusChange}
                value="a"
                name="radio-buttons"
                label="Active"
                slotProps={{ input: { "aria-label": "A" } }}
              />
              <Radio
                // checked={selectedValue === "b"}
                // onChange={handleChange}
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
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default AddSchedule;
