import { Link } from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import GenericTable, { JoyTableColumn } from "../../../core/components/table";
import { useMemo } from "react";
import { SiteModel } from "../model/site";
import { useGetSitesQuery } from "../api/site_endpoints";

export const SiteArchievePage = () => {
  const { data: sites, isLoading } = useGetSitesQuery({
    params: {},
  });
  const col = useMemo<Array<JoyTableColumn<SiteModel>>>(
    () => [
      {
        header: "Site Name",
        accessorKey: "name",
      },
      {
        header: "Owner",
        accessorKey: "owner",
      },
      {
        accessorKey: "client",
        header: "Client",
      },
      {
        accessorKey: "supervisor",
        header: "Supervisor",
      },
      {
        header: "Detail",
        accessorKey: "client",
        accessorFn(originalRow) {
          return (
            <Link href={`site/${originalRow.id}`}>{originalRow.client}</Link>
          );
        },
      },
    ],
    []
  );
  return (
    <DefaultPage title="Site Archieves">
      <GenericTable<SiteModel>
        unique="id"
        columns={col}
        data={sites ?? []}
        size="md"
      />
    </DefaultPage>
  );
};
