import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, List, ListItem, ListItemButton } from "@mui/joy";
import { useGetSiteByUserQuery } from "../api/site_endpoints";
import useUserData from "../../../core/auth/hooks/useUserData";
import { setSite } from "../../../core/shell/state/site_action";
import { useDispatch } from "react-redux";
import { SiteModel } from "../model/site";

function SitesList() {
  const [userData, _] = useUserData();
  const dispatch = useDispatch();
  const { data: sites, isLoading } = useGetSiteByUserQuery({
    params: { userId: userData?.user.id },
  });
  const handleSiteClick = (site: SiteModel) => {
    dispatch(setSite(site));
  };
  // const handleSiteChange = (site: SiteModel) => {
  //   dispatch(setSite(site));
  //   dispatch(api.util.resetApiState());
  //   setSelectedSite(site);
  // };

  // useEffect(() => {
  //   if (sites && sites.length > 0) {
  //     dispatch(setSite(sites?.[0]));
  //     setSelectedSite(site);
  //   }
  // }, [site]);
  // useEffect(() => {
  //   if (sites && sites.length > 0 && !selectedSite) {
  //     dispatch(setSite(sites?.[0]));
  //   }
  // });
  return (
    // <DefaultPage title="List of Sites" small={true}>
    // {isLoading ? (
    //   <h2>Loading </h2>
    // ) : (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <List
        // variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
        }}
      >
        <ListItem>
          <List>
            {sites?.map((site) => (
              <ListItem>
                <ListItemButton onClick={() => handleSiteClick(site)}>
                  {site.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
    </Box>
  );
}

export default SitesList;
