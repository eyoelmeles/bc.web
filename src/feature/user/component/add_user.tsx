import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  useCreateUserMutation,
  useGetAllRolesQuery,
  useUpdateUserMutation,
} from "../api/user.api";
import { User } from "../model/user";
import ImageUploader from "../../../core/ui/image_uploader";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: User;
}
const AddUser = (props: AddUserDialogProps) => {
  const [fullName, setFullName] = useState(props.user?.fullName ?? "");
  const [email, setEmail] = useState(props.user?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(props.user?.phoneNumber ?? "");
  const [userName, setUserName] = useState(props.user?.userName ?? "");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState(props.user?.roleId ?? "");

  const [image, setImage] = useState<string | null>(
    props?.user?.profileImage ?? null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: roles, isLoading } = useGetAllRolesQuery({});
  // const [image, setImage] = useState<string | null>(null);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  // const handleFileChange = (event: any) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const handleSubmit = async () => {
    try {
      if (props.user) {
        await updateUser({
          body: {
            id: props.user.id,
            fullName,
            email,
            phoneNumber,
            userName,
            password,
            // rePassword,
            role: role,
          },
        });
      } else {
        console.log(image);
        if (!image) return;
        if (!selectedFile) return;

        console.log("SELECTEDFILE", selectedFile);
        const formData = new FormData();
        formData.append("profileImage", selectedFile);
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("fullName", fullName);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);
        formData.append("role", role);
        console.log("FORMDATA", formData);
        await createUser({
          body: formData,
        });
      }
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={2}
        >
          <ImageUploader
            image={image}
            setImage={setImage}
            setSelectedFile={setSelectedFile}
          />
        </Box>
        <Stack spacing={2}>
          <Stack direction="row" flex={1} spacing={2}>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="User Name"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Stack>
          <Stack direction="row" flex={1} spacing={2}>
            <TextField
              margin="dense"
              label="Phone Number"
              fullWidth
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
          <Stack direction="row" flex={1} spacing={2}>
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Repeat Password"
              fullWidth
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Assign Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Assign Role"
              startAdornment={
                isLoading ? (
                  <InputAdornment position="end">
                    <CircularProgress />
                  </InputAdornment>
                ) : null
              }
              onChange={handleRoleChange}
            >
              {roles?.map((role, index) => (
                <MenuItem value={index}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
