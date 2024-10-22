import { createTheme } from "@mui/material/styles";
import palette from "#/theme/palette";
import components from "#/theme/components";
import typography from "#/theme/typography";


const theme = createTheme(
  {
    palette,
    shape: {
      borderRadius: 8,
    },
    components: {
      ...components,
    },
    typography,
  },
  );

export default theme;
