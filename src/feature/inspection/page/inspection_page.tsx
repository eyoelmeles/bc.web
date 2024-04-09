import {
  Box,
  Button,
  Select,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Option,
} from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import { Toolbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useGetAllSchedulesQuery } from "../../schedule/api/schedule_endpoint";
import { Schedule } from "../../schedule/model/schedule";
import { useState } from "react";
import DataTable from "../../../core/ui/table";
import InspectionTable from "../component/inspection_table";
import { Inspection } from "../model/inspection";
import InspectionForm from "../component/inspection_form";
import InsTable from "../component/ins_table";
import InspectionDetail from "../component/inspection_detail";
import { useSelector } from "react-redux";

const InspectionPage = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [openInspectionForm, setOpenInspectionForm] = useState<boolean>(false);
  const site = useSelector((state: any) => state.site);
  const { data: schedules } = useGetAllSchedulesQuery({
    params: { siteId: site?.id },
  });
  const [selectedInspection, setSelectedInspection] = useState<
    Inspection | undefined
  >();
  const handleCloseForm = () => {
    setOpenInspectionForm((insForm) => !insForm);
  };
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    const schedule = schedules?.filter(
      (schedule) => schedule.id == newValue
    )?.[0];
    if (schedule) {
      setSelectedSchedule(schedule);
    }
  };
  return (
    <DefaultPage title="Inspection">
      <Tabs sx={{ width: "100%", margin: "auto", padding: 2 }}>
        <TabList>
          <Tab variant="plain" color="neutral">
            Inspection Form
          </Tab>
          <Tab variant="plain" color="neutral">
            Inspections
          </Tab>
        </TabList>
        <Toolbar>
          <Box display="flex" flex={1} justifyContent="center">
            <Select
              placeholder="Choose one…"
              onChange={handleChange}
              sx={{ width: "50%" }}
            >
              {schedules?.map((schedule, index) => (
                <Option key={index} value={schedule.id}>
                  {schedule.name}
                </Option>
              ))}
            </Select>
          </Box>
        </Toolbar>
        <TabPanel value={0}>
          {/* <DataTable /> */}
          <InsTable
            setSelected={setSelectedInspection}
            selected={selectedInspection}
            schedule={selectedSchedule}
            onClose={handleCloseForm}
          />
        </TabPanel>
        <TabPanel value={1}>
          <InspectionDetail schedule={selectedSchedule} />
        </TabPanel>
      </Tabs>
      {!!openInspectionForm && selectedSchedule && (
        <InspectionForm
          open={openInspectionForm}
          onClose={handleCloseForm}
          schedule={selectedSchedule}
        //  inspection={selectedInspection}
        />
      )}
    </DefaultPage>
  );
};

export default InspectionPage;
