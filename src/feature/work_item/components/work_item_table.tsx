import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { WorkItem } from "../model/work_item";
import { useGetWorkItemsByScheduleQuery } from "../api/work_item_endpoints";
import { Schedule } from "../../schedule/model/schedule";
import { Button } from "@mui/joy";
import { ArrowForward } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface WorkItemScheduleTableProps {
  schedule: Schedule;
}
export default function WorkItemTable(props: WorkItemScheduleTableProps) {
  const { data } = useGetWorkItemsByScheduleQuery({
    params: {
      scheduleId: props.schedule.id,
    },
  });
  const navigate = useNavigate();
  const columns = useMemo<MRT_ColumnDef<WorkItem>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Work Item",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
      },
      {
        accessorKey: "rate",
        header: "Rate",
        size: 150,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 150,
      },
      {
        header: "",
        id: "hello",
        accessorFn(originalRow) {
          return (
            <Button
              variant="plain"
              endDecorator={<ArrowForward />}
              onClick={() => navigate(`./${originalRow.id}`)}
            >
              Detail
            </Button>
          );
        },
        size: 150,
      },
    ],
    []
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data ?? []}
      getRowId={(originalRow) => originalRow.id}
      enableRowActions
      renderRowActionMenuItems={({ row }) => [
        <MenuItem key="edit" onClick={() => console.info("Edit")}>
          Edit
        </MenuItem>,
        <MenuItem key="delete" onClick={() => console.info("Delete")}>
          Delete
        </MenuItem>,
      ]}
    />
  );
}
