import { Add, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AssignSiteForm from "../components/assign_site";
import {
  useDeleteSiteMutation,
  useGetSiteByIdQuery,
} from "../api/site_endpoints";
import SiteLocation from "../components/site_location";
import {
  Button,
  Stack,
  Typography,
  Skeleton,
  Box,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import AssignedUsersList from "../components/assigned_users_list";

const SiteDetail = () => {
  const [index, setIndex] = useState<number | null>(0);

  const { id } = useParams();
  // const [createBOQ, setCreateBOQ] = useState<boolean>(false);

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
    } catch (err) {}
  };

  return (
    <DefaultPage
      title={data?.name ?? ""}
      otherElement={
        <Button
          startDecorator={<Add />}
          variant="outlined"
          // onClick={() => setAssignSite(true)}
        >
          Create Bill of Quantity
        </Button>
      }
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>Site Name: </Typography>
          <Typography fontWeight="bold">{data?.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Site Owner: </Typography>
          <Typography fontWeight="bold">{data?.owner}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography>Site Assigned Users </Typography>
          <AssignedUsersList />
        </Stack>
        <AccordionGroup sx={{ maxWidth: 400 }}>
          <Accordion
            expanded={index === 0}
            onChange={(event, expanded) => {
              setIndex(expanded ? 0 : null);
            }}
          >
            <AccordionSummary>Site Engineers</AccordionSummary>
            <AccordionDetails>
              <Button sx={{ width: "100%" }}>Add Site Engineer</Button>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={index === 1}
            onChange={(event, expanded) => {
              setIndex(expanded ? 1 : null);
            }}
          >
            <AccordionSummary>Consultants</AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={index === 2}
            onChange={(event, expanded) => {
              setIndex(expanded ? 2 : null);
            }}
          >
            <AccordionSummary>Formans</AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        {data ? (
          <SiteLocation position={[data?.longitude, data?.latitude]} />
        ) : (
          <Skeleton width="80%" height="400px" />
        )}
        <Box justifyContent="end" alignItems="end" display="flex">
          <Button
            startDecorator={<Delete />}
            variant="outlined"
            color="danger"
            onClick={handleDelete}
          >
            Delete Site
          </Button>
        </Box>
      </Stack>
    </DefaultPage>
  );
};

export default SiteDetail;
