import { Add, ArrowForward, ArrowRight, Edit, Search } from "@mui/icons-material";
import AddSite from "../components/add_site";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSitesQuery } from "../api/site_endpoints";
import { SiteModel } from "../model/site";
import { Box, Button, CircularProgress, Input } from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

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
  const columns = useMemo<MRT_ColumnDef<SiteModel>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Site Name",
        size: 150,
      },
      {
        accessorKey: "owner",
        header: "Owner",
        size: 150,
      },
      {
        accessorKey: "client",
        header: "Client",
        size: 150,
      },
      {
        accessorKey: "supervisor",
        header: "Supervisor",
        size: 150,
      },
      {
        accessorKey: "contractor",
        header: "Contractor",
        size: 150,
      },
      // {
      //   accessorKey: "rate",
      //   header: "Rate",
      //   size: 150,
      // },
      // {
      //   accessorKey: "quantity",
      //   header: "Quantity",
      //   size: 150,
      // },
      {
        header: "",
        id: "details",
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
        <MaterialReactTable
          columns={columns}
          data={sites ?? []}
          getRowId={(originalRow) => originalRow.id}
          muiTableBodyRowProps={({ row }) => ({
            onDoubleClick: (_) => {
              console.info(row.id);
            },
            sx: {
              cursor: 'pointer',
            },
          })}
        />
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
