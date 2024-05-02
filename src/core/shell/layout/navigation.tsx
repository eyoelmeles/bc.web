import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { SIDEBAR_DATA, SidebarType } from "../sidebar/sidebar_data";
import SidebarMenu from "../sidebar/sidebar_menu";
import { useState } from "react";
import { APPBAR_HEIGHT } from "./layout";
import { useGetSiteByUserQuery } from "../../../feature/site/api/site_endpoints";
import useUserData from "../../auth/hooks/useUserData";

export default function EmailNav() {
  const [userData, _] = useUserData();
  const [selected, setSelected] = useState<string>("");
  const { data, isLoading } = useGetSiteByUserQuery({
    params: { userId: userData?.user.id },
  });
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
        {data !== undefined &&
          data?.length > 0 &&
          SIDEBAR_DATA.map((sidebar: SidebarType, index) => (
            <SidebarMenu
              key={`${index}-${sidebar.name}`}
              menu={sidebar}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
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
