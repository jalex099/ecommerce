import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";

function RegisterAccessContainer({ handleRegister }) {
  return (
    <Box sx={style.container}>
      <Regular14> &iquest; Sin cuenta a&uacute;n?</Regular14>
      <Box sx={style.link} onClick={handleRegister}>
        <Regular14>Registrate</Regular14>
      </Box>
    </Box>
  );
}

const style = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  link: (theme) => ({
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  }),
};

export default RegisterAccessContainer;
