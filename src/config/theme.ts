import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { extendTheme } from '@mui/joy/styles';

export const MuiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: blue.A400,
    },
  },
  typography: {
    fontSize: 14,
  },
});



// export const JoyTheme = extendTheme({
//   colorSchemes: {
//     light: {
//       palette: {
//         // affects all Joy components that has `color="primary"` prop.
//         primary: {
//           50: '#fffbeb',
//           100: '#fef3c7',
//           200: '#fde68a',
//           // 300, 400, ..., 800,
//           900: '#78350f',
//         },
//       },
//     },
//   },
//   fontSize: {
//     md: ".95rem",
//   },
//   fontFamily: {
//     display: 'Roboto, var(--joy-fontFamily-fallback)',
//     body: 'Roboto, var(--joy-fontFamily-fallback)',
//   },
// });

export const JoyTheme = extendTheme({
  fontFamily: {
    // display: 'SF Pro Text, var(--gh-fontFamily-fallback)',
    // body: 'SF Pro Text, var(--gh-fontFamily-fallback)',
    display: 'Roboto, var(--joy-fontFamily-fallback)',
    body: 'Roboto, var(--joy-fontFamily-fallback)',
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState}) => ({
          fontFamily: 'SF Pro Text, var(--gh-fontFamily-fallback)',
        })
      }
    },
  },
});