import React, { useEffect } from "react";
import { Schedule } from "../../schedule/model/schedule";
import { useLazyGetInspectionByScheduleQuery } from "../api/inspection_endpoints";
import { Checkbox, Stack, Table, Typography } from "@mui/joy";

interface InspectionDetailProps {
  schedule?: Schedule | null;
}
const InspectionDetail: React.FC<InspectionDetailProps> = (props) => {
  const [fetchInspections, { data }] = useLazyGetInspectionByScheduleQuery();
  useEffect(() => {
    if (props.schedule) {
      fetchInspections({
        params: {
          scheduleId: props.schedule.id,
        },
      });
    }
  }, [props.schedule]);
  return (
    <Table borderAxis="both">
      {/* <caption>A caption should be a summary of the table.</caption> */}
      <thead>
        <tr>
          <th style={{ width: "80%" }}>Description</th>
          <th>
            <Stack
              spacing={2}
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography>Done</Typography>
              <Typography>Fail</Typography>
              <Typography>N/A</Typography>
            </Stack>
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr key={row.id}>
            <td>{row.description}</td>
            <td>
              <Stack
                spacing={2}
                flexDirection="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Checkbox color="primary" />
                <Checkbox color="primary" />
                <Checkbox color="primary" />
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InspectionDetail;
