import { Box, Typography } from "@mui/joy";
import { SiteModel } from "../model/site";

interface SiteCardProps {
  site: SiteModel;
}

function SiteCard(props: SiteCardProps) {
  return (
    <Box display="flex" padding={{ sm: 1, md: 4 }}>
      <Typography>{props.site.name}</Typography>
      <Typography>{props.site.owner}</Typography>
    </Box>
  );
}

export default SiteCard;
