import { useGetAllUsersQuery } from "../../user/api/user.api";
import DefaultDialog from "../../../core/ui/default_dialog";
import {
  List,
  ListItem,
  ListItemDecorator,
  Avatar,
  Input,
  Stack,
  Button,
  Box,
  Link,
} from "@mui/joy";
import { SearchOutlined } from "@mui/icons-material";
import UserList from "./user_list";

interface AssignSiteDialogProps {
  siteId: string;
  open: boolean;
  onClose: () => void;
}

const AssignSiteForm = (props: AssignSiteDialogProps) => {
  const { data: usersData } = useGetAllUsersQuery({});

  // const handleAddUser = (userId: string) => {};

  return (
    <DefaultDialog
      open={props.open}
      onClose={props.onClose}
      title={`Assign User to a Site`}
      description={`Users from the left are not working on the Site`}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={2}>
            <Input
              placeholder="Search User"
              startDecorator={<SearchOutlined />}
              endDecorator={<Button variant="outlined">Search</Button>}
            />
            <List
              variant="outlined"
              sx={{
                minWidth: 240,
              }}
            >
              {usersData?.map((user) => (
                <UserList user={user} siteId={props.siteId} />
              ))}
              {/* <ListDivider inset="startDecorator" /> */}
            </List>
          </Stack>
          <Stack spacing={2}>
            <List
              variant="outlined"
              sx={{
                minWidth: 240,
              }}
            >
              <ListItem endAction={<Link color="danger">Remove</Link>}>
                <ListItemDecorator>
                  <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                </ListItemDecorator>
                Mabel Boyle
              </ListItem>
              {/* <ListDivider inset="startDecorator" /> */}
              <ListItem>
                <ListItemDecorator>
                  <Avatar size="sm" src="/static/images/avatar/2.jpg" />
                </ListItemDecorator>
                Boyd Burt
              </ListItem>
            </List>
          </Stack>
        </Stack>
        <Box display="flex" justifyContent="center">
          <Button fullWidth type="submit" sx={{ width: "60%" }}>
            Submit
          </Button>
        </Box>
      </Stack>
    </DefaultDialog>
  );
};

export default AssignSiteForm;
