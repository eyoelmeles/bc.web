import { Toolbar } from "@mui/material";
import EquipmentUsage from "../components/equipment_usage";
import MaterialUsage from "../components/material_usage";
import { Box, Stack, Typography } from "@mui/joy";
import Example from "../components/del";

const ChartsPage = () => {
  return (
    <Box sx={{ margin: 4 }}>
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Typography>Charts</Typography>
      </Toolbar>
      <Stack direction="row" padding={2} spacing={4} width="100%">
        <EquipmentUsage />
        <MaterialUsage />
      </Stack>
      <Example />
    </Box>
  );
};

export default ChartsPage;
