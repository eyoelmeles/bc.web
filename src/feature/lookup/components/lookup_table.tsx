import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useGetLookupsByLookupTypeQuery } from "../api/lookup_endpoint";
import { useMemo } from "react";
import { Lookup } from "../model/lookup";
import { Box, Button, Typography } from "@mui/joy";

interface LookupTableProps {
  selectedLookupType: number;
}

export default function LookupTable(props: LookupTableProps) {
  const { data: lookups } = useGetLookupsByLookupTypeQuery({
    params: {
      lookupType: props.selectedLookupType,
    },
  });
  const columns = useMemo<MRT_ColumnDef<Lookup>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
      },
    ],
    []
  );

  const handleDelete = () => { };
  return (
    <Box width="100%">
      <MaterialReactTable columns={columns} data={lookups ?? []} />
    </Box>
  );
}
