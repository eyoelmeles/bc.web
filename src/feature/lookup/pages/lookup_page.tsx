import { Toolbar } from "@mui/material";
import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/joy";
import LookupTable from "../components/lookup_table";
import { useEffect, useState } from "react";
import AddLookup from "../components/add_lookup";
import LookupTypeList from "../components/lookup_types_list";
import { useGetLookupTypesQuery } from "../api/lookup_endpoint";
import { Add } from "@mui/icons-material";

export const LookupPage = () => {
  const [createLookup, setCreateLookup] = useState<boolean>(false);
  const [selectedLookupType, setSelectedLookupType] = useState<number>(0);
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
        <Box padding={1} width="100%">
          <Box display="flex" justifyContent="space-between" padding={2} alignItems="start">
            <Typography level="h4" color="neutral">{selectedLookupType}</Typography>
            <Button variant="outlined" startDecorator={<Add />} onClick={handleCreateLookup}>Add Lookup</Button>
          </Box>
          <Divider />
          <LookupTable selectedLookupType={selectedLookupType} />
        </Box>
      </Box>

      {createLookup && (
        <AddLookup
          open={createLookup}
          onClose={handleCreateLookup}
          lookupType={selectedLookupType}
        />
      )}
    </DefaultPage>
  );
};
