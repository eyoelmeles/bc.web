import DefaultPage from "../../../core/shell/default_page/default_page";

import GTable, {
  GTableColumns,
} from "../../../core/components/g-table/g_table";
import { useMemo } from "react";
import { User } from "../../user/model/user";
import { Box, Avatar, Typography, ColorPaletteProp, Chip } from "@mui/joy";
import { AutorenewRounded, Block, CheckRounded } from "@mui/icons-material";

const rowing: User[] = [
  {
    id: "1",
    fullName: "root user",
    phoneNumber: "9876543210",
    profileImage: "profiile",
    roleId: "0",
    userName: "root",
    email: "root@email.com",
  },
  {
    id: "2",
    fullName: "root user",
    phoneNumber: "9876543210",
    profileImage: "profiile",
    roleId: "0",
    userName: "root",
    email: "root@email.com",
  },
  {
    id: "3",
    fullName: "root user",
    phoneNumber: "9876543210",
    profileImage: "profiile",
    roleId: "0",
    userName: "root",
    email: "root@email.com",
  },
];

const TaskScreen = () => {
  // {createLookup && (
  //   <AddLookup open={createLookup} onClose={handleCreateLookup} />
  // )}
  const col = useMemo<GTableColumns<User>[]>(
    () => [
      {
        name: "Username",
        key: "userName",
        accessorFn: (row) => (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar size="sm">{row.userName}</Avatar>
            <div>
              <Typography level="body-xs">{row.userName}</Typography>
              <Typography level="body-xs">{row.email}</Typography>
            </div>
          </Box>
        ),
      },
      {
        name: "Role",
        key: "roleId",
        accessorFn: (row) => (
          <Chip
            variant="soft"
            size="sm"
            startDecorator={
              {
                Paid: <CheckRounded />,
                Refunded: <AutorenewRounded />,
                Cancelled: <Block />,
              }["Paid"]
            }
            color={
              {
                Paid: "success",
                Refunded: "neutral",
                Cancelled: "danger",
              }["Cancelled"] as ColorPaletteProp
            }
          >
            {row.roleId}
          </Chip>
        ),
      },
      {
        name: "Emails",
        key: "email",
      },
    ],
    []
  );
  return (
    <DefaultPage title="Tasks">
      <GTable id="id" selectable columns={col} data={rowing} />
    </DefaultPage>
  );
};

export default TaskScreen;
