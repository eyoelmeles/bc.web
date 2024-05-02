import {
  Campaign,
  DisplaySettings,
  EditAttributesOutlined,
  Engineering,
  FolderZip,
  Foundation,
  GestureOutlined,
  HomeMaxOutlined,
  Person2Outlined,
  PersonAddAlt,
  ReceiptLong,
  SettingsOutlined,
  SettingsSuggest,
  SquareFoot,
  Update,
  Verified,
} from "@mui/icons-material";

export const SIDEBAR_DATA = [
  {
    name: "Sites",
    icon: <Foundation />,
    children: [
      {
        name: "Site",
        icon: <EditAttributesOutlined />,
        path: "/site",
      },
      {
        name: "Manage Site Members",
        icon: <PersonAddAlt />,
        path: "/manage-site",
      },
    ],
  },
  {
    name: "Site Reports",
    icon: <ReceiptLong />,
    path: "/site-report",
  },
  {
    name: "User",
    icon: <Engineering />,
    path: "/users",
  },
  {
    name: "Site Activity",
    icon: <Campaign />,
    path: "/site-activity",
  },

  {
    name: "Schedule",
    icon: <SquareFoot />,
    path: "/schedule",
  },
  {
    name: "RFI",
    icon: <Update />,
    path: "/rfi",
  },
  {
    name: "Inspection",
    icon: <Verified />,
    path: "/inspection",
  },
  {
    name: "Configuration",
    icon: <SettingsSuggest />,
    children: [
      {
        name: "Lookup",
        icon: <DisplaySettings />,
        path: "configuration/lookup",
      },
      {
        name: "Folders",
        icon: <FolderZip />,
        path: "configuration/files",
      },
    ],
  },
];

export interface SidebarType {
  name: string;
  icon: React.ReactElement;
  path?: string;
  children?: SidebarType[];
}
