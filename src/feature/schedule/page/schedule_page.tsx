import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, Button, Divider, Typography } from "@mui/joy";
import ScheduleList from "../components/schedule_list";
import { useEffect, useState } from "react";
import { Schedule } from "../model/schedule";
import { Toolbar } from "@mui/material";
import MilestoneForm from "../components/milestone_form";
import WorkItemTable from "../../work_item/components/work_item_table";
import WorkItemForm from "../../work_item/components/add_work_item";

const SchedulePage = () => {
  const [openOverview, setOpenOverview] = useState<boolean>(false);
  const [openWorkItem, setOpenWorkItem] = useState<boolean>(false);
  const [openMilestoneDialog, setOpenMilestoneDialog] =
    useState<boolean>(false);
  const [selected, setSelected] = useState<Schedule | undefined>();
  const handleSelected = (selected: Schedule) => {
    setSelected(selected);
    setOpenOverview(false);
  };

  useEffect(() => {
    if (!selected) setOpenOverview(true);
    else setOpenOverview(false);
  }, [selected]);

  const handleMilestoneDialog = () => {
    setOpenMilestoneDialog((open) => !open);
  };
  const handleWorkItemDialog = () => {
    setOpenWorkItem((open) => !open);
  };

  return (
    <DefaultPage title="Schedule">
      <Box display="flex" flex={1} height="100%">
        <Box
          flex={1}
          sx={(theme) => ({
            borderRight: 0.1,
            height: "100%",
          })}
        >
          <ScheduleList
            selected={selected}
            handleSelected={handleSelected}
            setOverview={setOpenOverview}
          />
        </Box>
        <Box flex={6}>
          {openOverview && (
            <Box>
              <Toolbar
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Typography level="h4">Overview</Typography>
                <Typography level="body-sm">
                  this is the site schedule overview, where the site milestones
                  are created
                </Typography>
              </Toolbar>
              <Divider />
              <Box padding={2} display="flex" flexDirection="column">
                <Button sx={{alignSelf: 'end'}} onClick={handleMilestoneDialog}>
                  Create Milestone
                </Button>
                <Typography>
                  Milestones help in setting clear expectations for all stakeholders involved, from the project owner and contractor to the labor force and the suppliers. They serve as checkpoints, making it easier to track any deviations from the plan, thus enabling proactive remediation. Furthermore, they provide motivation and a sense of achievement for the teams involved, as reaching each milestone signifies moving one step closer to the project's culmination.
                </Typography>
              </Box>
            </Box>
          )}
          {selected && !openOverview && (
            <Box>
              <Toolbar
                component={Box}
                display="flex"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flex={1}
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Typography textTransform="capitalize" level="h3">
                    {selected?.name}
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <Box
                      width=".5rem"
                      height=".5rem"
                      borderRadius="1rem"
                      sx={{ backgroundColor: "green" }}
                    />
                    <Typography textTransform="capitalize">Active</Typography>
                  </Box>
                </Box>
                <Button onClick={handleWorkItemDialog}>Add Work item</Button>
              </Toolbar>
              <Divider />
              <Box padding={4}>
                <Typography>{selected.description}</Typography>
                <WorkItemTable schedule={selected} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/* {workItemForm && selected && (
        <WorkItemForm
          open={workItemForm}
          onClose={() => setWorkItemForm(false)}
          schedule={selected}
        />
      )} */}
      {openMilestoneDialog && (
        <MilestoneForm
          open={openMilestoneDialog}
          onClose={handleMilestoneDialog}
        />
      )}
      {openWorkItem && selected && (
        <WorkItemForm
          open={openWorkItem}
          onClose={handleWorkItemDialog}
          schedule={selected}
        />
      )}
    </DefaultPage>
  );
};

export default SchedulePage;
