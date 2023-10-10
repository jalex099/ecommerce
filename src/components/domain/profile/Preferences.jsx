import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Regular14 from "#/components/shared/fonts/Regular14";
import { Chip } from "@mui/material";

function Preferences() {
  return (
    <Box sx={style.container}>
      <Regular18>Mis preferencias</Regular18>
      <Box sx={style.subcontainer}>
        <Box>
          <Regular14 styles={style.textMuted}>Categorias principales</Regular14>
          <Regular14>Dulces</Regular14>
        </Box>
        <Chip label="D" />
      </Box>
    </Box>
  );
}

const style = {
  container: {
    padding: "0 24px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
  },
  subcontainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textMuted: {
    color: (theme) => theme.palette.neutral60.main,
  },
};

export default Preferences;
