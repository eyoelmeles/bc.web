import { Edit } from "@mui/icons-material";

export const SIDEBAR_LIST = [
  {
    name: "Sites",
    path: "site",
    icon: <Edit />,
  },
  {
    name: "Users",
    path: "users",
    icon: <Edit />,
  },
  {
    name: "Configurations",
    path: "configuration",
    icon: <Edit />,
    children: [
      {
        name: "Users",
        path: "users",
        icon: <Edit />,
      },
    ],
  },
];
