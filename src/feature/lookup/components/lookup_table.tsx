import { useLazyGetLookupsByLookupTypeQuery } from "../api/lookup_endpoint";
import { useEffect, useMemo, useState } from "react";
import { Lookup } from "../model/lookup";
import { Box, Link, Stack } from "@mui/joy";
import { useSelector } from "react-redux";
import GTable, {
  GTableColumns,
} from "../../../core/components/g-table/g_table";
import DeleteModal from "../../../core/components/modal/delete_modal";

interface LookupTableProps {
  selectedLookupType: number;
  setOpenEdit: (lookup: Lookup) => void;
}

export default function LookupTable(props: LookupTableProps) {
  const [selectedLookup, setSelectedLookup] = useState<Lookup | null>(null);
  const site = useSelector((state: any) => state.site);

  const [refetchLookup, { data: lookups }] =
    useLazyGetLookupsByLookupTypeQuery();

  useEffect(() => {
    if (site) {
      refetchLookup(
        {
          params: {
            lookupType: props.selectedLookupType,
            siteId: site?.site?.id,
          },
        },
        true
      );
    }
  }, [site, props.selectedLookupType]);

  const columns = useMemo<GTableColumns<Lookup>[]>(
    () => [
      {
        key: "name", //access nested data with dot notation
        name: "Name",
      },
      {
        key: "description",
        name: "Description",
      },
      {
        key: "id",
        name: "",
        style: {
          textAlign: "end",
        },
        accessorFn: (row) => {
          return (
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Link onClick={() => props.setOpenEdit(row)}>Edit</Link>
              <Link onClick={() => setSelectedLookup(row)} color="danger">
                Delete
              </Link>
            </Stack>
          );
        },
      },
    ],
    []
  );

  return (
    <Box width="96%" display="flex" justifyContent="center">
      <GTable
        tableProps={{ variant: "outlined", size: "sm" }}
        id="id"
        columns={columns}
        data={lookups ?? []}
      />
      <DeleteModal
        open={!!selectedLookup}
        setOpen={() => setSelectedLookup(null)}
        title="Delete Lookup"
        warningText="are you sure"
        onDelete={() => {}}
      />
    </Box>
  );
}
