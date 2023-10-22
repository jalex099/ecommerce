import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import { Divider } from "@mui/material";
import RegisterAccessContainer from "#/components/domain/profile/RegisterAccessContainer";
import GoogleLoginButton from "#/components/domain/profile/GoogleLoginButton";
import EmailAndPasswordLoginForm from "#/components/domain/profile/EmailAndPasswordLoginForm";
import ForgotPasswordAccessContainer from "#/components/domain/profile/ForgotPasswordAccessContainer";

function SignInOptions({ handleRegister, handleGoogleLogin }) {
  return (
    <Box sx={style.container}>
      <EmailAndPasswordLoginForm />
      <Box sx={style.subcontainer}>
        <ForgotPasswordAccessContainer />
        <RegisterAccessContainer handleRegister={handleRegister} />
      </Box>
      <Box sx={style.o}>
        <Divider />
        <Regular14>o</Regular14>
        <Divider />
      </Box>
      <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "180px",
    gap: "24px",
  },
  o: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    "& hr": {
      width: "100%",
    },
  },
  subcontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "8px",
  },
};

export default SignInOptions;
