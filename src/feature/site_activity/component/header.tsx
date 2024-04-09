import { Search } from "@mui/icons-material";
import { Box, Button, IconButton, Option, Select, Typography } from "@mui/joy";
import { Toolbar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const ActivityHeader = () => {
  return (
    <Toolbar>
      <Box display="flex" justifyContent="space-between" flex={1}>
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontWeight="bold" level="h3">
            Report
          </Typography>
          <Select
            defaultValue="month"
            variant="plain"
            color="primary"
            sx={{ fontSize: 24, fontWeigh: 700 }}
          >
            <Option value="day">
              <Typography fontWeight="bold" level="body-md" color="primary">
                Day
              </Typography>
            </Option>
            <Option value="week">
              <Typography fontWeight="bold" level="body-md" color="primary">
                Week
              </Typography>
            </Option>
            <Option value="month">
              <Typography fontWeight="bold" level="body-md" color="primary">
                Monthly
              </Typography>
            </Option>
          </Select>
        </Box>
        <DatePicker
          slotProps={{
            textField: (ownerState) => ({
              size: "small",
            }),
          }}
        />
        <Box display="flex" gap={2} alignItems="center">
          <IconButton>
            <Search />
          </IconButton>
          <Button>Export</Button>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default ActivityHeader;
