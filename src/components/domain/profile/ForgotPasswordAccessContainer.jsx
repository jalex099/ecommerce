import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import AuthService from "#/services/AuthService";

function ForgotPasswordAccessContainer({handleForgotPassword}) {

  return (
    <Box sx={style.container}>
      <Box sx={style.link} onClick={handleForgotPassword}>
        <Regular14>Olvid&eacute; mi contrase&ntilde;a</Regular14>
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

export default ForgotPasswordAccessContainer;
