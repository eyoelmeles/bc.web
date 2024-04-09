import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";

interface EquipmentCostDTO {
  Id: string;
  Equipment: string;
  Count: number;
  UnitFactor: number;
  HourlyRental: number;
  WorkItem: string;
}

const dummyData: EquipmentCostDTO[] = [
  {
    Id: "34e90503-90e0-4467-83d7-cbabc1234567",
    Equipment: "45f90604-12a1-4569-89ab-cbaaa2345678",
    Count: 10,
    UnitFactor: 2,
    HourlyRental: 50,
    WorkItem: "34f90503-90e0-4467-83d7-cbabd3456789"
  },
  {
    Id: "12d80503-56e0-4498-93c9-dbabd1234567",
    Equipment: "78c90604-34b2-1234-56ef-dbaac2345678",
    Count: 5,
    UnitFactor: 3,
    HourlyRental: 60,
    WorkItem: "12e90503-90e0-4467-83d7-cbabf3456789"
  },
  {
    Id: "89d90203-12e1-4458-94c0-dcabd1234568",
    Equipment: "23a90605-34c3-6789-01gh-dbaab2345679",
    Count: 15,
    UnitFactor: 1,
    HourlyRental: 40,
    WorkItem: "23e90804-01e1-4560-89f1-cbabf4567809"
  }
];


const EquipmentTable: React.FC<{ data?: EquipmentCostDTO[] }> = ({ data }) => {
  const columns = useMemo<MRT_ColumnDef<EquipmentCostDTO>[]>(
    () => [
      {
        accessorKey: "Id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "Equipment",
        header: "Equipment",
        size: 150,
      },
      {
        accessorKey: "Count",
        header: "Count",
        size: 150,
      },
      {
        accessorKey: "UnitFactor",
        header: "Unit Factor",
        size: 150,
      },
      {
        accessorKey: "HourlyRental",
        header: "Hourly Rental",
        size: 150,
      },
      {
        accessorKey: "WorkItem",
        header: "Work Item",
        size: 150,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={dummyData ?? []}
      getRowId={(originalRow) => originalRow.Id}
    />
  );
};

export default EquipmentTable;
