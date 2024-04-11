import { Add, Search } from "@mui/icons-material";
import AddSite from "../components/add_site";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSitesQuery } from "../api/site_endpoints";
import { SiteModel } from "../model/site";
import { Box, Button, CircularProgress, Input, Link } from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import GenericTable, { JoyTableColumn } from "../../../core/components/table";

function SitePage() {
  const [addSite, setAddSite] = useState<boolean>(false);
  const [editSite, setEditSite] = useState<boolean>(false);
  const [selectedSite, setSelectedSite] = useState<SiteModel | undefined>(
    undefined
  );
  const navigate = useNavigate();
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
          return <Link href="">{originalRow.client}</Link>;
        },
      },
    ],
    []
  );

  return (
    <DefaultPage
      title="Site"
      primaryButton={
        <Button
          startDecorator={<Add />}
          variant="outlined"
          onClick={() => setAddSite(true)}
        >
          Add Site
        </Button>
      }
      otherElement={
        <Input
          variant="outlined"
          placeholder="Search…"
          startDecorator={<Search />}
        />
      }
    >
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress sx={{ width: 12, height: 12 }} />
        </Box>
      ) : (
        <>
          <GenericTable<SiteModel> columns={col} data={sites ?? []} />
        </>
      )}
      {addSite && <AddSite open={addSite} onClose={() => setAddSite(false)} />}
      {editSite && (
        <AddSite
          open={editSite}
          onClose={() => setEditSite(false)}
          site={selectedSite}
        />
      )}
    </DefaultPage>
  );
}

export default SitePage;
