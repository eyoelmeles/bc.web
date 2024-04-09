import { Box, Typography } from "@mui/joy";
import React from "react";

const ReportOverviewHeader = () => {
  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="space-between"
      alignItems="start"
      padding={4}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>Planned time</Typography>
        <Typography level="h4">40h 00m / 2h 00m</Typography>
        <Typography>Work / Break</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>Actual time</Typography>
        <Typography level="h4">40h 00m / 2h 00m</Typography>
        <Typography>Work / Break</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>Difference</Typography>
        <Typography level="h4">40h 00m / 2h 00m</Typography>
        <Typography>Work / Break</Typography>
      </Box>
    </Box>
  );
};

export default ReportOverviewHeader;
