import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, Button } from "@mui/joy";
import { Toolbar } from "@mui/material";

const TaskScreen = () => {
  // {createLookup && (
  //   <AddLookup open={createLookup} onClose={handleCreateLookup} />
  // )}
  return (
    <ScheduleShell title="Task">
      <Box width="20%" height="100%">
        <CostList />

      </Box>
    </ScheduleShell>
  );
};

export default TaskScreen;
