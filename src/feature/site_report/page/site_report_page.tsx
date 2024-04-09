import { Box, Button, Sheet, Stack } from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import { useState } from "react";
import DailyReportForm from "../component/daily_report_form";
import DailyReportCard from "../data/mock_card";
import { mockDailyReport } from "../data/mock_data";
import { addDays } from "date-fns";
import { DateRangePicker } from 'react-date-range';

const SiteReportPage = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [openDailyReport, setOpenDailyReport] = useState<boolean>(false);
  const handleDailyReportForm = () => {
    setOpenDailyReport(open => !open);
  }
  return (
    <DefaultPage title="Site Reports">
      <Box padding={2} display="flex" flexDirection="column">

        <Button sx={{ alignSelf: 'end' }} onClick={handleDailyReportForm}>Create Daily Report</Button>
        <Stack spacing={2} p={2}>
          <Sheet variant="outlined" sx={{ alignSelf: "center" }}>
            {/* TODO: https://www.npmjs.com/package/react-date-range and add more useful props */}
            <DateRangePicker
              showDateDisplay

              onChange={item => setState([item.selection] as any)}
              // showSelectionPreview={true}
              // moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              preventSnapRefocus={true}
            // calendarFocus="backwards"
            />
          </Sheet>
          <Box display="flex" flexDirection="column" width="50%">
            {mockDailyReport.map(report => (
              <DailyReportCard key={report.date.toString()} report={report} />
            ))}
          </Box>
          <Box display="flex" flexDirection="column" width="50%">

          </Box>
        </Stack>
        {openDailyReport && <DailyReportForm open={openDailyReport} onClose={handleDailyReportForm} />}
      </Box>
    </DefaultPage>
  );
};

export default SiteReportPage;
