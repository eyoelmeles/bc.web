import { useEffect, useState } from "react";
import {
  useCreateSiteMutation,
  useUpdateSiteMutation,
} from "../api/site_endpoints";
import { SiteModel } from "../model/site";
import SiteLocation from "./site_location";
import AddFilesDropZone from "../../../core/utils/drop_zone";
import DefaultDialog from "../../../core/ui/default_dialog";
import { Box, Button, Input, Stack, Typography } from "@mui/joy";

interface AddSiteDialogProps {
  site?: SiteModel;
  open: boolean;
  onClose: () => void;
}

const AddSite = (props: AddSiteDialogProps) => {
  const [sitePosition, setPosition] = useState<[number, number]>([
    9.018670677914995, 38.74850958716152,
  ]);
  const [file, setFile] = useState<File | undefined>();

  const [createSite] = useCreateSiteMutation();
  const [updateSite] = useUpdateSiteMutation();
  const handleAddSite = async (data: any) => {
    try {
      if (props.site) {
        await updateSite({
          body: {
            id: props.site.id,

          },
        });
      } else {
        const formData = new FormData();

        formData.append('Name', data.name);
        formData.append('Owner', data.owner);
        formData.append('client', data.client);
        formData.append('supervisor', data.supervisor);
        formData.append('contractor', data.contractor);
        formData.append('longitude', sitePosition[0].toString());
        formData.append('latitude', sitePosition[1].toString());
        if (file) formData.append('logo', file);
        await createSite({
          body: formData
        });
      }
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    console.log(sitePosition);
  });


  return (
    <DefaultDialog
      open={props.open}
      onClose={props.onClose}
      title={`${props.site ? "Edit Site" : "Create new Site"}`}
      description={``
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          handleAddSite(formJson);
        }}
        style={{ width: 800 }}
      >
        <Stack spacing={2} direction="row">
          <Stack spacing={2} display="flex" flex={1}>
            <Typography level="body-lg">Site Information</Typography>
            <Input
              fullWidth
              size="sm"
              placeholder="Site Name"
              name="name"
            />
            <Input
              fullWidth
              size="sm"
              placeholder="Owner"
              name="owner"
            />
            <Input
              fullWidth
              size="sm"
              placeholder="Client"
              name="client"
            />
            <Input
              fullWidth
              size="sm"
              placeholder="Supervisor"
              name="supervisor"
            />
            <Input
              fullWidth
              size="sm"
              placeholder="Contractor"
              name="contractor"
            />

            <Box paddingY={2}>
              <Typography>Logo</Typography>
              <Box paddingY={2}>
                <AddFilesDropZone setFile={setFile} file={file} />
              </Box>
            </Box>
          </Stack>
          <Stack display="flex" flex={1} spacing={2}>
            <Box>
              <Typography level="body-lg">Location</Typography>
              <SiteLocation position={sitePosition} setPosition={setPosition} />
            </Box>
          </Stack>
        </Stack>
        <Button fullWidth type="submit">Submit</Button>
      </form>
    </DefaultDialog>
  );
};

export default AddSite;
