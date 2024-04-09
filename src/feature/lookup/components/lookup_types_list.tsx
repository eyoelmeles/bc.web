import { SetStateAction } from "react";
import { useGetLookupTypesQuery } from "../api/lookup_endpoint";
import { Box, List, ListItem, ListItemButton, ListItemDecorator, Typography } from "@mui/joy";
import { LookupType } from "../model/lookup";
import { Apps } from "@mui/icons-material";

interface LookupTypeListProps {
  selectedLookup: LookupType;
  setLookupType: React.Dispatch<SetStateAction<number>>;
}

const LookupTypeList: React.FC<LookupTypeListProps> = (props) => {
  const { data: lookupTypes } = useGetLookupTypesQuery({
    params: {},
  });

  const handleLookupType = (lookupType: number) => {
    props.setLookupType(lookupType);
  };

  return (
    <Box sx={theme => ({ borderRight: .3, borderRightColor: theme.palette.neutral[300], height: '100%', width: "100%" })}>
      <Typography
        id="decorated-list-demo"
        level="body-xs"
        textTransform="uppercase"
        fontWeight="lg"
        sx={{ p: 2 }}
      >
        Lookup Types
      </Typography>
      <List
        sx={{
        }}
      >
        {lookupTypes?.map((lookupType: any, index: number) => (<ListItem>
          <ListItemButton selected={props.selectedLookup == index} onClick={() => handleLookupType(index)}>
            <ListItemDecorator>
              <Apps />
            </ListItemDecorator>
            {lookupType}
          </ListItemButton>
        </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LookupTypeList;
