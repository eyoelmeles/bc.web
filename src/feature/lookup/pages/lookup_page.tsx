import DefaultPage from "../../../core/shell/default_page/default_page";
import { Box, Button, Divider, Skeleton, Stack, Typography } from "@mui/joy";
import LookupTable from "../components/lookup_table";
import { useEffect, useState } from "react";
import LookupForm from "../components/lookup_form";
import LookupTypeList from "../components/lookup_types_list";
import { useGetLookupTypesQuery } from "../api/lookup_endpoint";
import { Add } from "@mui/icons-material";
import { capitalCase } from "change-case";
import { Lookup } from "../model/lookup";

export const LookupPage = () => {
  const [createLookup, setCreateLookup] = useState<boolean>(false);
  const [selectedLookup, setSelectedLookup] = useState<Lookup | null>(null);
  const [selectedLookupType, setSelectedLookupType] = useState<{
    name: string;
    index: number;
  } | null>(null);
  const handleCreateLookup = () => {
    setCreateLookup((lookup) => !lookup);
    setSelectedLookup(null);
  };

  let lookupTypes: string[] = [];

  const { data } = useGetLookupTypesQuery({});

  useEffect(() => {
    if (data) {
      lookupTypes = Object.keys(data).filter((key) => isNaN(Number(key)));
    }
  }, [data]);

  const handleEdit = (lookup: Lookup) => {
    handleCreateLookup();
    setSelectedLookup(lookup);
  };

  return (
    <DefaultPage title="Lookups">
      <Box display="flex" height="100%">
        <Box
          width="30%"
          height="100%"
          sx={{ display: { xs: "none", sm: "initial" } }}
        >
          <LookupTypeList
            setLookupType={setSelectedLookupType}
            selectedLookup={selectedLookupType}
          />
        </Box>
        <Stack
          width="100%"
          spacing={2}
          alignItems="center"
          justifyContent="start"
        >
          <Box width="100%">
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              height="auto"
              padding={1}
              minHeight={60}
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
          </Box>
          <LookupTable
            selectedLookupType={selectedLookupType?.index || 0}
            setOpenEdit={handleEdit}
          />
        </Stack>
      </Box>

      {createLookup && (
        <LookupForm
          open={createLookup}
          onClose={handleCreateLookup}
          lookupType={selectedLookupType?.index || 0}
          lookup={selectedLookup}
        />
      )}
    </DefaultPage>
  );
};
