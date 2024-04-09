import {
  AccessibilityNewRounded,
  AdUnitsRounded,
  AirplanemodeActiveRounded,
  BluetoothRounded,
  EditNotificationsRounded,
  EmailRounded,
  MessageRounded,
  SettingsVoiceRounded,
  SpatialTrackingRounded,
  TapAndPlayRounded,
  WifiRounded,
  ZoomInRounded,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Avatar,
  FormControl,
  FormLabel,
  ListItemContent,
  Stack,
  Switch,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";

export default function AccordionFilter() {
  return (
    <AccordionGroup
      variant="plain"
      transition="0.2s"
      sx={{
        maxWidth: 400,
        borderRadius: "md",
        [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
          {
            paddingBlock: "1rem",
          },
        [`& .${accordionSummaryClasses.button}`]: {
          paddingBlock: "1rem",
        },
      }}
    >
      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <TapAndPlayRounded />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Connections</Typography>
            <Typography level="body-sm">
              Activate or deactivate your connections
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <AirplanemodeActiveRounded />
              <FormLabel>Airplane Mode</FormLabel>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <WifiRounded sx={{ mx: 1 }} />
              <FormLabel>Wi-Fi</FormLabel>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <BluetoothRounded sx={{ mx: 1 }} />
              <FormLabel>Bluetooth</FormLabel>
              <Switch />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="success">
            <EditNotificationsRounded />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Notifications</Typography>
            <Typography level="body-sm">
              Enable or disable your notifications
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <EmailRounded sx={{ mx: 1 }} />
              <FormLabel>E-mail</FormLabel>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <MessageRounded sx={{ mx: 1 }} />
              <FormLabel>Messages</FormLabel>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <AdUnitsRounded sx={{ mx: 1 }} />
              <FormLabel>Push</FormLabel>
              <Switch />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="danger">
            <AccessibilityNewRounded />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Accessibility</Typography>
            <Typography level="body-sm">
              Toggle your accessibility settings
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <ZoomInRounded sx={{ mx: 1 }} />
              <FormLabel>Zoom</FormLabel>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <SpatialTrackingRounded sx={{ mx: 1 }} />
              <FormLabel>Audio Descriptions</FormLabel>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <SettingsVoiceRounded sx={{ mx: 1 }} />
              <FormLabel>Voice Control</FormLabel>
              <Switch />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
