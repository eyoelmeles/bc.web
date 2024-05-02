import { Avatar, Button, ListItem, ListItemDecorator } from "@mui/joy";
import { User } from "../../user/model/user";
import { useAssignUserMutation } from "../api/site_endpoints";
import { Add } from "@mui/icons-material";

interface UserListInterface {
  user: User;
  siteId: string;
}

const UserList = (props: UserListInterface) => {
  const [assignUser] = useAssignUserMutation();

  const handleAssignUser = async () => {
    try {
      console.log(props.siteId, props.user.id);
      await assignUser({
        body: {
          siteId: props.siteId,
          usersId: [props.user.id],
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ListItem
      endAction={
        <Button variant="plain" onClick={handleAssignUser}>
          <Add />
        </Button>
      }
    >
      <ListItemDecorator>
        <Avatar size="sm" src="/static/images/avatar/1.jpg" />
      </ListItemDecorator>
      {props.user.fullName}
    </ListItem>
  );
};

export default UserList;
