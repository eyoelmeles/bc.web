import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Card, CardActions, CardContent, IconButton, Typography, accordionClasses } from "@mui/joy";
import { useState } from "react";

const DailyReportCard: React.FC<{ report: DailyReportDTO }> = ({ report }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    // <Card>
    //   <CardContent>
    //     <Typography level="h3">{report.date.toLocaleDateString()}</Typography>
    //     <Typography>Work Hour: {report.workHour}</Typography>
    //     <Typography>Interrupted Hour: {report.interruptedHour}</Typography>
    //     <Typography>Weather: {report.weather}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <IconButton
    //       onClick={handleExpandClick}
    //       aria-expanded={expanded}
    //       aria-label="show more"
    //     >
    //       <ExpandMore />
    //     </IconButton>
    //   </CardActions>
    //   <Collapse in={expanded} timeout="auto" unmountOnExit>
    //     <CardContent>
    //       <Typography variant="h6">Staff on Site:</Typography>
    //       {report.staffsOnSite.map(staff => (
    //         <Typography key={staff.id}>{staff.name} - {staff.role}</Typography>
    //       ))}
    //       {/* Add similar details for other fields */}
    //     </CardContent>
    //   </Collapse>
    // </Card>

    <AccordionGroup
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
      <Box>
        <Typography level="h3">{report.date.toLocaleDateString()}</Typography>
        <Typography level="body-sm">Work Hour: {report.workHour}</Typography>
        <Typography level="body-sm">Interrupted Hour: {report.interruptedHour}</Typography>
        <Typography level="body-sm">Weather: {report.weather}</Typography>
      </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>

          <Box>
          <Typography level="h3">Staff on Site:</Typography>
          {report.staffsOnSite.map(staff => (
            <Typography key={staff.id}>{staff.name} - {staff.role}</Typography>
          ))}
          </Box>
          <Box>
          <Typography level="h3">Labour:</Typography>
          {report.labourForces.map(staff => (
            <Typography key={staff.id}>{staff.role} - {staff.count}</Typography>
          ))}
          </Box>
          <Box>
          <Typography level="h3">Material:</Typography>
          {report.materialsReport.map(staff => (
            <Typography key={staff.id}>{staff.materialName} - Quantity used: {staff.quantityUsed}</Typography>
          ))}
          </Box>
          <Box>
          <Typography level="h3">Equipment:</Typography>
          {report.equipmentReport.map(staff => (
            <Typography key={staff.id}>{staff.equipmentName} - Work Hours: {staff.hoursUsed}</Typography>
          ))}</Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
export default DailyReportCard;