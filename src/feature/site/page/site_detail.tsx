import { Add, ArrowLeft, Delete } from "@mui/icons-material";
import {
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssignSiteForm from "../components/assign_site";
import {
  useDeleteSiteMutation,
  useGetSiteByIdQuery,
} from "../api/site_endpoints";
import SiteLocation from "../components/site_location";

const SiteDetail = () => {
  const { id } = useParams();
  const [assignSite, setAssignSite] = useState<boolean>(false);
  const [createBOQ, setCreateBOQ] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, isLoading } = useGetSiteByIdQuery({
    params: {
      id: id,
    },
  });
  const [deleteSite] = useDeleteSiteMutation();

  const handleDelete = async () => {
    try {
      await deleteSite({
        params: {
          id: id,
        },
      });
      navigate(-1);
    } catch (err) {}
  };

  return (
    <Paper sx={{ margin: 4 }}>
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Stack spacing={2} justifyContent="start" alignItems="start">
          <Button
            startIcon={<ArrowLeft />}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data?.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setAssignSite(true)}
          >
            Assign Site
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setAssignSite(true)}
          >
            Create Bill of Quantity
          </Button>
        </Stack>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>Site Owner : {data?.owner}</ListItem>
        <ListItem>Site Location</ListItem>
        {data && <SiteLocation position={[data?.latitude, data?.longitude]} />}
      </List>
      <Button startIcon={<Delete />} color="error" onClick={handleDelete}>
        Delete Site
      </Button>
      {assignSite && id && (
        <AssignSiteForm
          siteId={id}
          open={assignSite}
          onClose={() => setAssignSite(false)}
        />
      )}
    </Paper>
  );
};

export default SiteDetail;
