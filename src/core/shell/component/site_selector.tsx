import React, { FC } from "react";
import { SiteModel } from "../../../feature/site/model/site";
import { Box, Select, Option } from "@mui/joy";

interface SiteSelectorProps {
  sites: SiteModel[];
  site: SiteModel | null;
  setSite: (site: SiteModel) => void;
  label?: string;
}

const SiteSelector: FC<SiteSelectorProps> = (props) => {
  const handleChange = (
    _: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    const found = props.sites?.find((site) => site.id === newValue);
    if (found) props.setSite(found);
  };

  return (
    <Box>
      <Select variant="plain" onChange={handleChange} size="sm" sx={{ p: 0 }}>
        {props?.sites?.map((site) => (
          <Option value={site.id}>{site.name}</Option>
        ))}
      </Select>
    </Box>
  );
};

export default SiteSelector;
