import { Apps } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemDecorator } from '@mui/joy';

const TaskDetail = () => {
return (<List
      sx={{
        maxWidth: 320,
      }}
    >
      <ListItem>
        <ListItemButton >
          <ListItemDecorator>
            <Apps />
          </ListItemDecorator>
          Manpower cost
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <Apps />
          </ListItemDecorator>
          Material cost
        </ListItemButton>
      </ListItem>
      <ListItem >
        <ListItemButton selected>
          <ListItemDecorator>
            <Apps />
          </ListItemDecorator>
          Equipment cost
        </ListItemButton>
      </ListItem>
    </List>
);
}

export default TaskDetail;