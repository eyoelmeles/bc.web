import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ReceiptLong from "@mui/icons-material/ReceiptLong";
import ScheduleListItem from "./schedlue_list_item";
import { useGetRootSchedulesQuery } from "../api/schedule_endpoint";
import { Schedule } from "../model/schedule";
import React, { SetStateAction } from "react";

interface ScheduleListProps {
  selected: Schedule | undefined;
  handleSelected: (selected: Schedule) => void;
  setOverview: React.Dispatch<SetStateAction<boolean>>;
}

const ScheduleList: React.FC<ScheduleListProps> = (props) => {
  const { data } = useGetRootSchedulesQuery({
    params: {},
  });
  return (
    <Box
      sx={{
        width: 320,
        pl: "24px",
      }}
    >
      <List
        size="sm"
        sx={(theme) => ({
          // Gatsby colors
          "--joy-palette-primary-plainColor": "#8a4baf",
          "--joy-palette-neutral-plainHoverBg": "transparent",
          "--joy-palette-neutral-plainActiveBg": "transparent",
          "--joy-palette-primary-plainHoverBg": "transparent",
          "--joy-palette-primary-plainActiveBg": "transparent",
          [theme.getColorSchemeSelector("dark")]: {
            "--joy-palette-text-secondary": "#635e69",
            "--joy-palette-primary-plainColor": "#d48cff",
          },

          "--List-insetStart": "32px",
          "--ListItem-paddingY": "0px",
          "--ListItem-paddingRight": "16px",
          "--ListItem-paddingLeft": "21px",
          "--ListItem-startActionWidth": "0px",
          "--ListItem-startActionTranslateX": "-50%",

          [`& .${listItemButtonClasses.root}`]: {
            borderLeftColor: "divider",
          },
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
            {
              borderLeftColor: "currentColor",
            },
          '& [class*="startAction"]': {
            color: "var(--joy-palette-text-tertiary)",
          },
        })}
      >
        <ListItem nested>
          <ListItem component="div" startAction={<ReceiptLong />}>
            <Typography level="body-xs" sx={{ textTransform: "uppercase" }}>
              Documentation
            </Typography>
          </ListItem>
          <List sx={{ "--List-gap": "0px" }}>
            <ListItem>
              <ListItemButton
                selected
                onClick={() => props.setOverview((overview) => !overview)}
              >
                Overview
              </ListItemButton>
            </ListItem>
          </List>
        </ListItem>
        {data?.map((schedule, index) => (
          <ScheduleListItem
            key={`${index}-${schedule.name}`}
            schedule={schedule}
            selected={props.selected}
            handleSelected={props.handleSelected}
          />
        ))}
      </List>
    </Box>
  );
};

export default ScheduleList;
