import { Notifications } from "@mui/icons-material";
import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";
import React, { memo } from "react";

interface NotifactionBarProps {
  siteId: string;
}

const NotificationBar: React.FC<NotifactionBarProps> = (props) => {
  return (
    <Dropdown>
      <MenuButton variant="soft" aria-label="Notifications" size="sm">
        <Notifications fontSize="small" />
      </MenuButton>

      <Menu>
        <MenuItem>Notification 1</MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default memo(NotificationBar);
