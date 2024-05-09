import { useLazyGetLookupsByLookupTypeQuery } from "../api/lookup_endpoint";
import { useEffect, useMemo } from "react";
import { Lookup } from "../model/lookup";
import { Box } from "@mui/joy";
import { useSelector } from "react-redux";
import GTable, {
  GTableColumns,
} from "../../../core/components/g-table/g_table";

interface LookupTableProps {
  selectedLookupType: number;
}

export default function LookupTable(props: LookupTableProps) {
  const site = useSelector((state: any) => state.site);

  const [refetchLookup, { data: lookups }] =
    useLazyGetLookupsByLookupTypeQuery();

  useEffect(() => {
    if (site) {
      refetchLookup(
        {
          params: {
            lookupType: props.selectedLookupType,
            siteId: site.id,
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
    ],
    []
  );

  const handleDelete = () => {};
  return (
    <Box width="100%">
      <GTable id="id" columns={columns} data={lookups ?? []} />
    </Box>
  );
}
