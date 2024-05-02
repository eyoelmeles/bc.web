import { useEffect, useState } from "react";
import Layout, { APPBAR_HEIGHT } from "./layout/layout";
import Navigation from "./layout/navigation";
import ColorSchemeToggle from "./sidebar/color_scheme_toggle";
import {
  IconButton,
  Input,
  Typography,
  Box,
  Avatar,
  Dropdown,
  MenuItem,
  Menu as JoyMenu,
  MenuButton,
  Stack,
  ListDivider,
} from "@mui/joy";
import {
  SearchRounded,
  Menu as MenuIcon,
  MailRounded,
  Notifications,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL, api } from "../../store/app_api";
import { useGetSiteByUserQuery } from "../../feature/site/api/site_endpoints";
import { SiteModel } from "../../feature/site/model/site";
import { useDispatch, useSelector } from "react-redux";
import { setSite } from "./state/site_action";
import ProfileMenuList from "./component/profile_menu";
import { User } from "../../feature/user/model/user";
import NotificationBar from "./component/notification";

function Shell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<SiteModel | undefined>();
  const user = JSON.parse(localStorage.getItem("userData") ?? "");

  useEffect(() => {
    console.log(user.user.profileImage);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const { data: sites } = useGetSiteByUserQuery({
    params: {
      userId: user.user.id,
    },
  });

  const dispatch = useDispatch();

  const handleSiteChange = (site: SiteModel) => {
    dispatch(setSite(site));
    dispatch(api.util.resetApiState());
    setSelectedSite(site);
  };
  const site = useSelector((state: any) => state.site);
  useEffect(() => {
    if (sites && sites.length > 0) {
      dispatch(setSite(sites?.[0]));
      setSelectedSite(site);
    }
  }, [site]);
  useEffect(() => {
    if (sites && sites.length > 0 && !selectedSite) {
      dispatch(setSite(sites?.[0]));
    }
  });
  return (
    <Box>
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
      // sx={{
      //   ...(drawerOpen && {
      //     height: "100vh",
      //     overflow: "hidden",
      //   }),
      // }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="sm"
              variant="soft"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              <MailRounded fontSize="small" />
            </IconButton>
            <Stack>
              <Typography component="h1" fontWeight="xl">
                BUILD CONNECT
              </Typography>
              <Typography level="body-xs">{site?.name ?? ""}</Typography>
            </Stack>
            {/* <BuildConnectLogo /> */}
          </Box>
          <Input
            size="sm"
            variant="outlined"
            placeholder="Search anything…"
            startDecorator={<SearchRounded color="primary" />}
            endDecorator={
              <IconButton variant="outlined" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
                  ⌘ + k
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: "500px",
              display: {
                xs: "none",
                sm: "flex",
              },
              boxShadow: "sm",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <ColorSchemeToggle />
            <NotificationBar siteId={sites?.[0]?.id ?? ""} />
            <ProfileMenuList
              user={user.user as User}
              handleLogout={handleLogout}
            />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            display="flex"
            flex={1}
            height={`calc(100vh - ${APPBAR_HEIGHT}px - 32px)`}
            width="auto"
            overflow="hidden auto"
          >
            <Outlet />
          </Box>
        </Layout.Main>
      </Layout.Root>
    </Box>
  );
}

export default Shell;
