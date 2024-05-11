import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { APPBAR_HEIGHT } from "./layout";
import { useLazyGetSiteByUserQuery } from "../../../feature/site/api/site_endpoints";
import useUserData from "../../auth/hooks/useUserData";
import { RenderMenus } from "../component/render_menus";

export default function EmailNav() {
  const [userData, _] = useUserData();
  const [selected, setSelected] = useState<string>("");
  const [fetchSites, { data, isLoading }] = useLazyGetSiteByUserQuery({});

  useEffect(() => {
    if (userData?.user?.id) {
      fetchSites(
        {
          params: { userId: userData?.user.id },
        },
        true
      );
    }
  }, [userData]);

  return (
    <Box
      sx={{
        height: `calc(100vh - ${APPBAR_HEIGHT}px - 24px)`,
        overflow: "hidden",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "space-between",
      }}
    >
      <List
        sx={{
          "--ListItem-radius": "8px",
          "--List-gap": "2px",
          "--List-nestedInsetStart": "20px",
        }}
      >
        <RenderMenus
          isLoading={isLoading}
          data={data}
          selected={selected}
          setSelected={setSelected}
        />
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List
        sx={{
          "--ListItem-radius": "8px",
          "--List-gap": "2px",
          justifyContent: "end",
          height: "auto",
        }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="life-buoy" />
            </ListItemDecorator>
            <ListItemContent>Supports</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="settings" />
            </ListItemDecorator>
            <ListItemContent>Settings</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
