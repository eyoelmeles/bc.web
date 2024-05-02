import {
  Avatar,
  Dropdown,
  MenuButton,
  Menu,
  Box,
  Typography,
  MenuItem,
  ListDivider,
} from "@mui/joy";
import React from "react";
import { User } from "../../../feature/user/model/user";

interface ProfileMenuList {
  user: User;
  handleLogout: () => void;
}

const ProfileMenuList: React.FC<ProfileMenuList> = (props) => {
  return (
    <Dropdown>
      <MenuButton variant="plain" size="sm">
        <Avatar
          src={`http://localhost:5259/api/files/${props.user.profileImage}
`}
        />
      </MenuButton>
      <Menu sx={{ padding: 0 }}>
        <MenuItem sx={{ padding: 2 }}>
          <Box display="flex" gap={2}>
            <Avatar
              src={`http://localhost:5259/api/files/${props.user.profileImage}
`}
              size="lg"
            />
            <Box>
              <Typography>{props.user.fullName}</Typography>
              <Typography>{props.user.email}</Typography>
            </Box>
          </Box>
        </MenuItem>
        <ListDivider />
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={props.handleLogout} color="danger">
          Logout
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default ProfileMenuList;
