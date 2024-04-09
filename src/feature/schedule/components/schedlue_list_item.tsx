import { Add, Edit, KeyboardArrowDown } from "@mui/icons-material";
import {
  ListItem,
  Typography,
  List,
  ListItemButton,
  IconButton,
  Box,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Schedule } from "../model/schedule";
import { useLazyGetChildSchedulesQuery } from "../api/schedule_endpoint";
import AddSchedule from "./add_schedule";
import EditSchedule from "./edit_schedule";

interface SchedlueListItemProps {
  schedule: Schedule;
  selected: Schedule | undefined;
  handleSelected: (selected: Schedule) => void;
}

const ScheduleListItem: React.FC<SchedlueListItemProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openAddSchedule, setAddOpenSchedule] = useState<boolean>(false);
  const [openEditSchedule, setEditOpenSchedule] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<
    Schedule | undefined
  >();
  const [fetchChildSchedules, { data }] = useLazyGetChildSchedulesQuery();
  useEffect(() => {
    if (open) {
      fetchChildSchedules(
        {
          params: {
            id: props.schedule.id,
          },
        },
        true
      );
    }
  }, [open]);
  const handleAddForm = (selectedSchedule?: Schedule) => {
    setSelectedSchedule(selectedSchedule);
    setAddOpenSchedule((addOpenSchedule) => !addOpenSchedule);
  };

  const handleEditForm = (selectedSchedule?: Schedule) => {
    setSelectedSchedule(selectedSchedule);
    setEditOpenSchedule(true);
  };
  return (
    <ListItem
      nested
      sx={{ my: 1 }}
      startAction={
        <IconButton
          variant="plain"
          size="sm"
          color="neutral"
          onClick={() => setOpen(!open)}
        >
          <KeyboardArrowDown
            sx={{ transform: open ? "initial" : "rotate(-90deg)" }}
          />
        </IconButton>
      }
    >
      <ListItem
        sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            level="inherit"
            sx={{
              fontWeight: open ? "bold" : undefined,
              color: open ? "text.primary" : "inherit",
            }}
          >
            {props.schedule.name}
          </Typography>
          {/* <Typography component="span" level="body-xs" sx={{ ml: 1 }}>
              {props.items.length}
            </Typography> */}
        </Box>
        <Box>
          <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            onClick={() => handleEditForm(props.schedule)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            onClick={() => handleAddForm(props.schedule)}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </ListItem>
      {open && (
        <List sx={{ "--ListItem-paddingY": "8px" }}>
          {data?.map((item, index) => (
            <ListItem
              key={`${index}-${item.name}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemButton
                selected={props.selected?.id == item.id}
                onClick={() => props.handleSelected(item)}
              >{`${index}. ${item.name}`}</ListItemButton>
              {/* <Box>
                <IconButton
                  variant="plain"
                  size="sm"
                  color="neutral"
                  onClick={() => handleEditForm(item)}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  variant="plain"
                  size="sm"
                  color="neutral"
                  onClick={() => handleAddForm(item)}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box> */}
            </ListItem>
          ))}
        </List>
      )}
      {openAddSchedule && (
        <AddSchedule
          schedule={selectedSchedule}
          open={openAddSchedule}
          onClose={handleAddForm}
        />
      )}
      {openEditSchedule && selectedSchedule && (
        <EditSchedule
          schedule={selectedSchedule}
          selectedSchedule={selectedSchedule}
          open={openEditSchedule}
          onClose={() => setEditOpenSchedule(false)}
        />
      )}
    </ListItem>
  );
};

export default ScheduleListItem;
