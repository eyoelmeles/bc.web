import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { SetStateAction, useState } from "react";
import { SidebarType } from "./sidebar_data";
import { useNavigate } from "react-router-dom";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";

interface SidebarMenuProps {
  menu: SidebarType;
  selected?: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
}

const SidebarMenu: React.FC<SidebarMenuProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpanded = () => {
    if (props.menu.children) setIsExpanded(!isExpanded);
    else {
      props.setSelected(props.menu.name);
      navigate(`${props.menu.path}`);
    }
  };
  return (
    <ListItem nested={isExpanded}>
      <ListItemButton
        onClick={toggleExpanded}
        selected={props.selected === props.menu.name}
      >
        <ListItemDecorator>
          {/* <i data-feather={props.menu.icon} /> */}
          {props.menu.icon}
        </ListItemDecorator>
        <ListItemContent>{props.menu.name}</ListItemContent>
        {/* <i data-feather={isExpanded ? "chevron-down" : "chevron-up"} /> */}
        {props.menu.children &&
          (isExpanded ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />)}
      </ListItemButton>
      {isExpanded && props.menu.children && (
        <List>
          {props.menu?.children.map((sidebar: SidebarType, index: number) => (
            <SidebarMenu
              key={`${index}-${sidebar.name}`}
              menu={sidebar}
              selected={props.selected}
              setSelected={props.setSelected}
            />
          ))}
        </List>
      )}
    </ListItem>
  );
};

export default SidebarMenu;
