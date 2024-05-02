import { Box, Button, Sheet, Typography } from "@mui/joy";

const EmptySitePage = (props: any) => {
  return (
    <Sheet
      variant="outlined"
      style={{
        height: "98%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Typography>No Project</Typography>
        <Button onClick={props.handleClick}>Create a new Project</Button>
      </Box>
    </Sheet>
  );
};

export default EmptySitePage;
