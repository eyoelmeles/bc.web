import { Box } from '@mui/joy'
import MaterialReactTable from 'material-react-table'
import React, { useMemo } from 'react'

const AssignRoleTable = () => {
    const site = useSelector((state: any) => state.site);
  const { data: lookups } = useGetLookupsByLookupTypeQuery({
    params: {
      lookupType: props.selectedLookupType,
      siteId: site.id,
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
  return (
    <Box width="100%">
      <MaterialReactTable columns={columns} data={lookups ?? []} />
    </Box>
  )
}

export default AssignRoleTable