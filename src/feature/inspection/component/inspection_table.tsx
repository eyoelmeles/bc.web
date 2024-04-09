import React, { SetStateAction, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { type MRT_ColumnDef } from "material-react-table";
import { Inspection } from "../model/inspection";
import { useLazyGetInspectionByScheduleQuery } from "../api/inspection_endpoints";
import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";

interface InspectionTableProps {
  scheduleId: string | null;
  setSelected: React.Dispatch<SetStateAction<Inspection | undefined>>;
  selected: Inspection | undefined;
}

const InspectionTable: React.FC<InspectionTableProps> = (props) => {
  const [fetchInspections, { data }] = useLazyGetInspectionByScheduleQuery();
  useEffect(() => {
    if (props.scheduleId) {
      fetchInspections({
        params: {
          scheduleId: props.scheduleId,
        },
      });
    }
  }, [props.scheduleId]);
  const handleOpenInspection = (selectedInspection: Inspection) => {
    props.setSelected(selectedInspection);
  };
  const columns = useMemo<MRT_ColumnDef<Inspection>[]>(
    () => [
      {
        header: "Description",
        accessorKey: "description", //using accessorKey dot notation to access nested data
      },
      {
        header: "Status",
        accessorFn: (originalRow) => originalRow.status, //alternative to accessorKey, using accessorFn
        id: "status",
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <MaterialReactTable
        columns={columns}
        data={data ?? []}
        //   enableRowSelection //enable some features
        enableColumnOrdering
        enableGlobalFilter={false} //turn off a feature
        enableRowActions
        positionActionsColumn="last"
        renderRowActionMenuItems={({ row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              handleOpenInspection(row.original);
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon color="warning">
              <Edit />
            </ListItemIcon>
            Edit
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              handleOpenInspection(row.original);
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon color="danger">
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>,
        ]}
      />
    </React.Fragment>
  );
};

export default InspectionTable;
