import { Stack } from "@mui/material";
import { Lookup, LookupType } from "../model/lookup";
import { Button, Input, Textarea } from "@mui/joy";
import {
  useCreateLookupMutation,
  useUpdateLookupMutation,
} from "../api/lookup_endpoint";
import DefaultDialog from "../../../core/ui/default_dialog";
import { useSelector } from "react-redux";

interface LookupFormProps {
  lookup: Lookup | null;
  lookupType: number;
  open: boolean;
  onClose: () => void;
}

const LookupForm = (props: LookupFormProps) => {
  const site = useSelector((state: any) => state.site);
  const [createLookup] = useCreateLookupMutation();
  const [updateLookup] = useUpdateLookupMutation();
  const handleLookup = async (data: any) => {
    try {
      if (props.lookup) {
        await updateLookup({
          body: {
            id: props.lookup?.id,
            name: data.name,
            description: data.description,
            siteId: site.site?.id,
          },
        });
      } else {
        await createLookup({
          body: {
            name: data.name,
            description: data.description,
            lookupType: props.lookupType,
            siteId: site?.site?.id,
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
      title={props?.lookup ? "Update Lookup" : "Create New Lookup"}
      description={`${
        Object.keys(LookupType).filter((x) => isNaN(Number(x)))[
          props.lookupType
        ]
      }, update endpoint is not done yet`}
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
              defaultValue={props?.lookup ? props?.lookup?.name : ""}
            />
            <Textarea
              minRows={2}
              placeholder="Description"
              name="description"
              defaultValue={props?.lookup ? props?.lookup?.description : ""}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </DefaultDialog>
  );
};

export default LookupForm;
