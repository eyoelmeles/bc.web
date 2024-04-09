import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Button, Divider, Typography, accordionClasses } from "@mui/joy";

const ReportCard = () => {
  return ( <AccordionGroup
      sx={{
        // maxWidth: 400,
        [`& .${accordionClasses.root}`]: {
          marginTop: '0.5rem',
          transition: '0.2s ease',
          '& button:not([aria-expanded="true"])': {
            transition: '0.2s ease',
            paddingBottom: '0.625rem',
          },
          '& button:hover': {
            background: 'transparent',
          },
        },
        [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
          bgcolor: 'background.level1',
          borderRadius: 'md',
          borderBottom: '1px solid',
          borderColor: 'background.level2',
        },
        '& [aria-expanded="true"]': {
          boxShadow: (theme) => `inset 0 -1px 0 ${theme.vars.palette.divider}`,
        },
      }}
    >
      <Accordion>
        <AccordionSummary>
    <Box
      padding={2}
      sx={(theme) => ({ backgroundColor: theme.palette.neutral.softBg })}
      borderRadius={16}
      display="flex"
      flex={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={0}
        justifyContent="start"
        alignItems="start"
      >
        <Typography>Shift</Typography>
        <Typography level="h3">31 Aug, Fri</Typography>
        <Typography>2023</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>Planned time 8h 00m / 09:00 - 18:00</Typography>
        <Typography>Planned time 8h 00m / 09:00 - 18:00</Typography>
        <Typography>Difference -0h 35m</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>Planned cost 240,000 br</Typography>
        <Typography>Planned cost 240,000 br</Typography>
        <Typography>Difference - 0</Typography>
      </Box>
      <Button>Approve</Button>
    </Box>
    </AccordionSummary>
    <AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default ReportCard;
