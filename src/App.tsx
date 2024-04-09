import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AppRoute from "./config/router";
import {
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles";
import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme,
} from "@mui/joy/styles";
import useScript from "./core/utils/use_script";
import { useEffect, useLayoutEffect } from "react";
import { GlobalStyles } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { JoyTheme, MuiTheme } from "./config/theme";

const materialTheme = extendMaterialTheme(MuiTheme);

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function App() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);
  return (
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider defaultMode="dark" theme={JoyTheme}>
        <GlobalStyles
          styles={(theme) => ({
            "[data-feather], .feather": {
              color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
              margin: "var(--Icon-margin)",
              fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
              width: "1em",
              height: "1em",
            },
          })}
        />
        <CssBaseline enableColorScheme />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <AppRoute />
          </BrowserRouter>
        </LocalizationProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
