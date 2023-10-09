import { createTheme } from "@mui/material/styles";
import palette from "#/theme/palette";
import components from "#/theme/components";
import typography from "#/theme/typography";
import MuiCssBaseline from "#/theme/MuiCssBaseline";

const theme = createTheme({
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: MuiCssBaseline,
    },
    ...components,
  },
  typography,
});

export default theme;
