import React, { Dispatch, FC, SetStateAction } from "react";
import { SiteModel } from "../../../feature/site/model/site";
import { Box, Link, Skeleton, Typography } from "@mui/joy";
import { ErrorOutline, WifiOffOutlined } from "@mui/icons-material";
import SidebarMenu from "../sidebar/sidebar_menu";
import { SIDEBAR_DATA, SidebarType } from "../sidebar/sidebar_data";

interface RenderMenuProps {
  data: SiteModel[] | undefined;
  isLoading: boolean;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export const RenderMenus: FC<RenderMenuProps> = (props) => {
  if (props.data == undefined) {
    return (
      <Box style={{ gap: 4, display: "flex" }}>
        <WifiOffOutlined />
        <Typography level="body-xs">No Connection</Typography>
      </Box>
    );
  }
  if (props.isLoading) {
    return (
      <Box>
        <Typography>
          <Skeleton loading={props.isLoading}>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries.
          </Skeleton>
        </Typography>
      </Box>
    );
  }
  if (props.data && props.data.length == 0) {
    return (
      <Box>
        <Box style={{ gap: 4, display: "flex" }}>
          <ErrorOutline />
          <Typography level="body-xs">
            You are not involved in any site Projects
          </Typography>
        </Box>
        <Link href="#">You are not involved in any site Projects</Link>
      </Box>
    );
  } else {
    return SIDEBAR_DATA.map((sidebar: SidebarType, index) => (
      <SidebarMenu
        key={`${index}-${sidebar.name}`}
        menu={sidebar}
        selected={props.selected}
        setSelected={props.setSelected}
      />
    ));
  }
};
