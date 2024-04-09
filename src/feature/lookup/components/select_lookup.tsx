import React, { SetStateAction, useEffect, useState } from "react";
import { Lookup, LookupType } from "../model/lookup";
import { Autocomplete, AutocompleteOption, CircularProgress } from "@mui/joy";
import { useGetLookupsByLookupTypeQuery } from "../api/lookup_endpoint";
import { LiveTv, Note, NoteOutlined } from "@mui/icons-material";

interface SelectLookupProps {
  title: string;
  lookup?: Lookup | null;
  lookupType: LookupType;
  setLookup: React.Dispatch<SetStateAction<Lookup | null>>;

}

const SelectLookup: React.FC<SelectLookupProps> = (props) => {
  const [selectLookup, setSelectLookup] = useState<Lookup | null>(null)
  const { data: lookups, isLoading: loading } = useGetLookupsByLookupTypeQuery({
    params: {
      lookupType: props.lookupType,
    },
  });

  useEffect(() => {
    if (lookups && props.lookup) {
      setSelectLookup(props.lookup)
    }
  }, [lookups, props.lookup])

  return (
    <Autocomplete<Lookup>
      size="sm"
      sx={{ width: '100%' }}
      startDecorator={<NoteOutlined />}
      placeholder={props.title}
      value={selectLookup ?? props.lookup}
      options={lookups ?? []}
      isOptionEqualToValue={(option, value) => option.name.toLowerCase() === value.name.toLowerCase()}
      getOptionLabel={(option) => option.name}
      onChange={(_, newValue) => {
        props.setLookup(newValue);
      }}
      loading={loading}
      endDecorator={
        loading ? (
          <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
        ) : null
      }
    />
  );
};

export default SelectLookup;
