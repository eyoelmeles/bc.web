import { Avatar, Stack, Typography } from "@mui/material";

interface UserColumnProps {
  fullName: string;
  userName: string;
  image: string;
}
const UserColumn = (props: UserColumnProps) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Avatar variant="rounded" sx={{width:32, height: 32}} src={props.image} />
      <Stack spacing={1}>
        <Typography variant="body2">{props.fullName}</Typography>
        <Typography variant="caption">{props.userName}</Typography>
      </Stack>
    </Stack>
  );
};

export default UserColumn;
