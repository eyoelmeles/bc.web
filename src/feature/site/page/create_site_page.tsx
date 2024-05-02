import { Box, Button, Grid, Input, Sheet, Stack, Typography } from "@mui/joy";

const CreateSitePage = () => {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100vw",
        height: "100vh",
        justifyContent: "flex-start",
        overflow: "auto",
        gap: {
          sm: 4,
          md: 6,
        },
        padding: {
          sm: 2,
          md: 4,
        },
        alignItems: "space-evenly",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: {
            sm: "center",
            md: "flex-start",
          },
          justifyContent: {
            sm: "center",
            md: "flex-start",
          },
          width: {
            xs: "100%",
          },
        }}
      >
        <Typography level="h3">Create Site</Typography>
        <Typography level="body-md">Some important note here later</Typography>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid xs={12} sm={12} md={6}>
          <Sheet variant="outlined">
            <Stack spacing={2} padding={2}>
              <Box>
                <Typography level="h4">1. Site Details</Typography>
                <Typography level="body-md">
                  You can add more information later
                </Typography>
              </Box>
              <Input placeholder="Site Name" />
              <Input placeholder="Contractor" />
              <Input placeholder="Site Owner" />
              <Input placeholder="Client" />
              <Input placeholder="Supervisor" />
            </Stack>
          </Sheet>
        </Grid>
        <Grid xs={12} sm={12} md={6}>
          <Sheet variant="outlined">
            <Stack spacing={2} padding={2}>
              <Box>
                <Typography level="h4">2. Pricing</Typography>
                <Typography level="body-md">
                  20% Off for 2 year subscription
                </Typography>
              </Box>
              <Box display="flex" gap={2}>
                <Sheet variant="outlined" sx={{ flexGrow: 1, height: 100 }} />
                <Sheet variant="outlined" sx={{ flexGrow: 1, height: 100 }} />
              </Box>
              <Box>
                <Typography>Payment</Typography>
                <Typography>Payment Options</Typography>
              </Box>
              <Box display="flex" flexGrow={1} gap={2}>
                <Sheet variant="outlined" sx={{ flexGrow: 1, height: 100 }} />
                <Sheet variant="outlined" sx={{ flexGrow: 1, height: 100 }} />
              </Box>
            </Stack>
          </Sheet>
        </Grid>
      </Grid>
      <Button sx={{ width: 300, alignSelf: "center" }}>Create a Site</Button>
    </Sheet>
  );
};

export default CreateSitePage;
