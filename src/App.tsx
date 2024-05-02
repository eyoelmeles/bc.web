import { BrowserRouter } from "react-router-dom";
import AppRoute from "./config/router";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { JoyTheme } from "./config/theme";

function App() {
  return (
    <JoyCssVarsProvider defaultMode="system" theme={JoyTheme}>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </LocalizationProvider>
    </JoyCssVarsProvider>
  );
}

export default App;
