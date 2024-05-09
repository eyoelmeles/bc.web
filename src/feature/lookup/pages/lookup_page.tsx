import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, Button, Divider, Skeleton, Stack, Typography } from "@mui/joy";
import LookupTable from "../components/lookup_table";
import { useEffect, useState } from "react";
import AddLookup from "../components/add_lookup";
import LookupTypeList from "../components/lookup_types_list";
import { useGetLookupTypesQuery } from "../api/lookup_endpoint";
import { Add } from "@mui/icons-material";
import { LookupType } from "../model/lookup";

import { capitalCase } from "change-case";

export const LookupPage = () => {
  const [createLookup, setCreateLookup] = useState<boolean>(false);
  const [selectedLookupType, setSelectedLookupType] = useState<{
    name: string;
    index: number;
  } | null>(null);
  const handleCreateLookup = () => {
    setCreateLookup((lookup) => !lookup);
  };

  let lookupTypes: string[] = [];

  const { data } = useGetLookupTypesQuery({
    params: {},
  });

  useEffect(() => {
    if (data) {
      lookupTypes = Object.keys(data).filter((key) => isNaN(Number(key)));
    }
  }, [data]);

  return (
    <DefaultPage title="Lookups">
      <Box display="flex" height="100%">
        <Box width="20%" height="100%">
          <LookupTypeList
            setLookupType={setSelectedLookupType}
            selectedLookup={selectedLookupType}
          />
        </Box>
        <Stack paddingY={2} width="100%" spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingX={1}
            alignItems="start"
          >
            <Typography level="h4" color="neutral">
              <Skeleton loading={!selectedLookupType}>
                {capitalCase(selectedLookupType?.name ?? "")}
              </Skeleton>
            </Typography>
            <Button
              variant="outlined"
              startDecorator={<Add />}
              onClick={handleCreateLookup}
            >
              Add Lookup
            </Button>
          </Box>
          <Divider />
          <LookupTable selectedLookupType={selectedLookupType?.index || 0} />
        </Stack>
      </Box>

      {createLookup && (
        <AddLookup
          open={createLookup}
          onClose={handleCreateLookup}
          lookupType={selectedLookupType?.index || 0}
        />
      )}
    </DefaultPage>
  );
};
