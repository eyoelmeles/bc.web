import { Add, Search } from "@mui/icons-material";
import AddSite from "../components/add_site";
import { useMemo, useState } from "react";
import { useGetSiteByUserQuery } from "../api/site_endpoints";
import { SiteModel } from "../model/site";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  Link,
} from "@mui/joy";
import DefaultPage from "../../../core/shell/default_page/default_page";
import GenericTable, { JoyTableColumn } from "../../../core/components/table";
import useUserData from "../../../core/auth/hooks/useUserData";
import { useDispatch, useSelector } from "react-redux";
import { setSite } from "../../../core/shell/state/site_action";
import EmptySitePage from "./empty_site";
import SitesList from "./sites_list";

function SitePage() {
  const [addSite, setAddSite] = useState<boolean>(false);
  const [editSite, setEditSite] = useState<boolean>(false);
  const [selectedSite, setSelectedSite] = useState<SiteModel | undefined>(
    undefined
  );

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
        header: "",
        accessorKey: "client",
        accessorFn(originalRow) {
          return <Link href={`site/${originalRow.id}`}>Detail</Link>;
        },
      },
    ],
    []
  );

  const site = useSelector((state: any) => state.site);

  const [userData, _] = useUserData();

  const dispatch = useDispatch();

  const { data: sites, isLoading } = useGetSiteByUserQuery({
    params: { userId: userData?.user.id },
  });

  const handleSiteClick = (site: SiteModel) => {
    dispatch(setSite(site));
  };

  return (
    <Box display="flex" width="100%">
      {site && sites !== undefined && sites?.length > 0 && (
        <DefaultPage
          title={"Site"}
          primaryButton={
            <Button
              startDecorator={<Add fontSize="small" />}
              variant="outlined"
              size="md"
              onClick={() => setAddSite(true)}
              disabled
            >
              Add Site
            </Button>
          }
          otherElement={
            <Input
              variant="outlined"
              placeholder="Search…"
              size="sm"
              startDecorator={<Search fontSize="small" />}
            />
          }
        >
          {isLoading ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress sx={{ width: 12, height: 12 }} />
            </Box>
          ) : (
            <>
              <GenericTable<SiteModel>
                unique={"id"}
                columns={col}
                data={sites ?? []}
                size="sm"
              />
            </>
          )}
          {addSite && (
            <AddSite open={addSite} onClose={() => setAddSite(false)} />
          )}
          {editSite && (
            <AddSite
              open={editSite}
              onClose={() => setEditSite(false)}
              site={selectedSite}
            />
          )}
        </DefaultPage>
      )}
      {sites !== undefined && sites?.length === 0 && (
        <EmptySitePage handleClick={() => setAddSite(true)} />
      )}
      {!site && sites !== undefined && sites?.length > 0 && <SitesList />}
      {addSite && <AddSite open={addSite} onClose={() => setAddSite(false)} />}
    </Box>
  );
}

export default SitePage;
