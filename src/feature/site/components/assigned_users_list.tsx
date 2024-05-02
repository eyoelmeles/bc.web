import {
  List,
  ListItem,
  ListDivider,
  Avatar,
  ListItemDecorator,
} from "@mui/joy";

const AssignedUsersList = () => {
  return (
    <List
      orientation="horizontal"
      variant="outlined"
      sx={{
        flexGrow: 1,
        flexWrap: "wrap",
        mx: "auto",
        "--ListItemDecorator-size": "48px",
        "--ListItem-paddingY": "1rem",
        borderRadius: "sm",
      }}
    >
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/1.jpg" />
        </ListItemDecorator>
        Mabel Boyle
      </ListItem>
      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />
      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/3.jpg" />
        </ListItemDecorator>
        Adam Tris
      </ListItem>
    </List>
  );
};

export default AssignedUsersList;
