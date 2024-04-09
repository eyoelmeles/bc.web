import { Menu, MenuBookRounded, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AppbarSearch,
  AppbarSearchIconWrapper,
  StyledInputBase,
} from "./components/search";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import AccordionFilter from "./components/appbar_menu_list";

interface AppbarProps {
  handleDrawerOpen: () => void;
}
function Appbar(props: AppbarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar
      position="static"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        component={Box}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Build Connect
          </Typography>
          <AppbarSearch>
            <AppbarSearchIconWrapper>
              <Search />
            </AppbarSearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </AppbarSearch>
        </Stack>
        <Stack>
          <IconButton onClick={handleClick}>
            <MenuBookRounded />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <AccordionFilter />
          </Popover>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Appbar;
