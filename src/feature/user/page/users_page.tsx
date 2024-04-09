import { useState } from "react";
import {
  InputAdornment,
  Stack,
  Paper,
  Divider,
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Add,
  ArrowRight,
  Edit,
  Search,
  SearchRounded,
} from "@mui/icons-material";
import AddUser from "../component/add_user";
import { useGetAllUsersQuery } from "../api/user.api";
import { User } from "../model/user";
import UserColumn from "../component/user_column";
import DefaultPage from "../../../core/shell/default_page/default_page";
import { Button, IconButton, Input, Typography } from "@mui/joy";

const UsersPage = () => {
  const [addUser, setAddUser] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsersQuery({});
  return (
    <DefaultPage
      title="User"
      otherElement={
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search User…"
          fullWidth
          startDecorator={<SearchRounded color="primary" />}
          sx={{
            flexBasis: "500px",
            display: {
              xs: "none",
              sm: "flex",
            },
            minWidth: "350px",
            boxShadow: "sm",
          }}
        />
      }
      primaryButton={
        <Button
          startDecorator={<Add />}
          fullWidth
          variant="solid"
          onClick={() => setAddUser(true)}
        >
          Add User
        </Button>
      }
    >
      <Stack direction="row" spacing={2}></Stack>
      <Divider />
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row: User) => (
                <TableRow
                  key={row.fullName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <UserColumn
                      fullName={row.fullName}
                      userName={row.userName}
                      image={row.profileImage}
                    />
                  </TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                      gap={2}
                    >
                      <Button
                        startDecorator={<Edit />}
                        onClick={() => {
                          setSelectedUser(row);
                          setEditUser(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        endDecorator={<ArrowRight />}
                        onClick={() => {
                          navigate(`./${row.id}`);
                        }}
                      >
                        Detail
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {addUser && <AddUser open={addUser} onClose={() => setAddUser(false)} />}
      {editUser && (
        <AddUser
          open={editUser}
          onClose={() => setEditUser(false)}
          user={selectedUser}
        />
      )}
    </DefaultPage>
  );
};

export default UsersPage;
