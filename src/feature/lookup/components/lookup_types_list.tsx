import { SetStateAction, useEffect } from "react";
import { useGetLookupTypesQuery } from "../api/lookup_endpoint";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Skeleton,
  Typography,
} from "@mui/joy";
import { LookupType } from "../model/lookup";
import { Apps } from "@mui/icons-material";
import { capitalCase } from "change-case";

interface LookupTypeListProps {
  selectedLookup: { name: string; index: number } | null;
  setLookupType: React.Dispatch<
    SetStateAction<{ name: string; index: number } | null>
  >;
}

const LookupTypeList: React.FC<LookupTypeListProps> = (props) => {
  const { data: lookupTypes } = useGetLookupTypesQuery({
    params: {},
  });

  const handleLookupType = (name: string, index: number) => {
    props.setLookupType({ name, index });
  };

  useEffect(() => {
    if (lookupTypes?.length > 0)
      props.setLookupType({ name: lookupTypes[0], index: 0 });
  }, [lookupTypes]);

  return (
    <Box
      sx={(theme) => ({
        borderRight: 1,
        borderRightColor: theme.palette.divider,
        height: "100%",
        width: "100%",
      })}
    >
      <Typography
        id="decorated-list-demo"
        level="body-xs"
        textTransform="uppercase"
        fontWeight="lg"
        sx={{ p: 2 }}
      >
        Lookup Types
      </Typography>
      <List size="sm" sx={{ width: "100%" }}>
        {lookupTypes?.map((lookupType: string, index: number) => (
          <ListItem key={`${index}-${lookupType}`}>
            <ListItemButton
              selected={props.selectedLookup?.index == index}
              onClick={() => handleLookupType(lookupType, index)}
            >
              <ListItemDecorator>
                <Apps />
              </ListItemDecorator>
              <Typography>
                <Skeleton loading={!props?.selectedLookup}>
                  {capitalCase(lookupType)}
                </Skeleton>
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LookupTypeList;
