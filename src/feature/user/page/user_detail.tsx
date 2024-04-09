import { Delete } from "@mui/icons-material";
import { Avatar, Button, List, ListItem, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUserMutation, useGetUserQuery } from "../api/user.api";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading} = useGetUserQuery({
    params: {
      id: id,
    }
  })
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async () => {
    try {
      const val = await deleteUser({
        params: {
          id: id,
        },
      }).unwrap();
      console.log(val);
      navigate(-1);
    } catch (e) {}
  };
  return (
    <Paper sx={{ margin: 4 }}>
      {user && <Avatar 
      src={user?.profileImage || undefined}
      variant="rounded"
      sx={{width: 100, height: 100}}
      />}
      
      <List>
        <ListItem>Username {user?.userName}</ListItem>
        <ListItem>email: {user?.fullName}</ListItem>
        <ListItem>phone number: {user?.phoneNumber}</ListItem>
        <Button color="error" startIcon={<Delete />} onClick={handleDelete}>
          Delete
        </Button>
      </List>
    </Paper>
  );
};

export default UserDetail;
