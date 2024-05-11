import { Apps } from "@mui/icons-material";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemDecorator,
  ListItemButton,
  Divider,
} from "@mui/joy";
import React, { SetStateAction } from "react";
import { useGetAllRolesQuery } from "../../user/api/user.api";
import { RoleProperty } from "../page/manage_site_team";
import { capitalCase } from "change-case";

interface SiteRolesProps {
  role: string | null;
  setRole: React.Dispatch<SetStateAction<RoleProperty | null>>;
}

const SiteRoles: React.FC<SiteRolesProps> = (props) => {
  const handleSelectRole = (name: string, index: number) => {
    props.setRole({
      name,
      index,
    });
  };
  const { data: roles, isLoading } = useGetAllRolesQuery({});

  return (
    <Box
      sx={(theme) => ({
        borderRight: 1,
        borderRightColor: theme.palette.divider,
        height: "100%",
        width: "100%",
      })}
    >
      <Box minHeight={60} sx={{ p: 2 }} display="flex">
        <Typography
          id="decorated-list-demo"
          level="body-xs"
          textTransform="uppercase"
          fontWeight="lg"
          alignSelf="flex-end"
        >
          Roles
        </Typography>
      </Box>
      <Divider />
      <List>
        {roles?.map((role, index) => (
          <ListItem>
            <ListItemButton
              selected={props.role === role}
              onClick={() => handleSelectRole(role, index)}
            >
              <ListItemDecorator>
                <Apps />
              </ListItemDecorator>
              {capitalCase(role)}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SiteRoles;
