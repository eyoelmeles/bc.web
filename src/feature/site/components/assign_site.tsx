import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../user/api/user.api";
import { User } from "../../user/model/user";
import axios from "axios";
import { useAssignUserMutation } from "../api/site_endpoints";

function not(a: readonly User[], b: readonly User[]) {
  return a.filter((user) => !b.some((bUser) => bUser.id === user.id));
}

function intersection(a: readonly User[], b: readonly User[]) {
  return a.filter((userId) => b.some((user) => user.id === userId.id));
}

function union(a: readonly User[], b: readonly User[]) {
  return [...a, ...not(b, a)];
}

interface AssignSiteDialogProps {
  siteId: string;
  open: boolean;
  onClose: () => void;
}

const AssignSiteForm = (props: AssignSiteDialogProps) => {
  const [checked, setChecked] = useState<readonly User[]>([]);
  const [left, setLeft] = useState<readonly User[]>([]);
  const [right, setRight] = useState<readonly User[]>([]);
  const { data: usersData, isLoading } = useGetAllUsersQuery({});

  const [assignUser] = useAssignUserMutation();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (user: User) => () => {
    const isUserChecked = checked.some((u) => u.id === user.id);
    let newChecked = [...checked];

    if (!isUserChecked) {
      newChecked.push(user);
    } else {
      newChecked = newChecked.filter((u) => u.id !== user.id);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    if (usersData) {
      setLeft(usersData);
    }
  }, [usersData]);

  const numberOfChecked = (items: readonly User[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (users: readonly User[]) => () => {
    if (numberOfChecked(users) === users.length) {
      setChecked(not(checked, users));
    } else {
      setChecked(union(checked, users));
    }
  };

  const handleCheckedRight = () => {
    const leftCheckedIds = leftChecked.map((user) => user.id);
    setRight(
      right.concat(left.filter((user) => leftCheckedIds.includes(user.id)))
    );
    setLeft(left.filter((user) => !leftCheckedIds.includes(user.id)));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const rightCheckedIds = rightChecked.map((user) => user.id);
    setLeft(
      left.concat(right.filter((user) => rightCheckedIds.includes(user.id)))
    );
    setRight(right.filter((user) => !rightCheckedIds.includes(user.id)));
    setChecked(not(checked, rightChecked));
  };

  const handleAssignUser = async () => {
    try {
      console.log(props.siteId);
      const users = right?.map((user) => user.id);
      // const x = await assignUser({
      //   body: {
      //     siteId: props.siteId.toString(),
      //     usersId: right?.map(user => user.id.toString()),
      //   },
      // });
      await axios.post("http://192.168.1.2:5259/site/assignuser", {
        siteId: props.siteId.toString(),
        usersId: right?.map((user) => user.id.toString()),
      });
      // console.log("x", x);
    } catch (err) {
      console.log(err);
    }
  };

  const customList = (title: React.ReactNode, items: readonly User[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all Users selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((user: User) => {
          const labelId = `transfer-list-all-item-${user.id}-label`;

          return (
            <ListItem
              key={user.id}
              role="listitem"
              button
              onClick={handleToggle(user)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.filter((u) => user.id === u.id).length > 0}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={user.fullName} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Assign Site </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList("All Users", left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList("Site Users", right)}</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAssignUser} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignSiteForm;
