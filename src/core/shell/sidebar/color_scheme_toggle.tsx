import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";

const ModeToggle = () => {
  const { mode, setMode: setJoyMode } = useJoyColorScheme();

  const handleModeChange = () => {
    setJoyMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      variant="soft"
      size="sm"
      onClick={handleModeChange}
      sx={{ flexShrink: 0 }}
    >
      {mode === "dark" ? (
        <LightMode fontSize="small" />
      ) : (
        <DarkMode fontSize="small" />
      )}
    </IconButton>
  );
};

export default ModeToggle;
