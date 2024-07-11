import SignInOptions from "#/components/domain/profile/SignInOptions";
import AuthService from "#/services/AuthService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useHookstate } from "@hookstate/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "#/components/shared/icons/CloseIcon";

const LoginDialog = () => {
  const navigate = useNavigate();
  const isOpen = useHookstate(false)
  const { loginWithGoogle, loginWithFacebook } = AuthService();

  const handleOpen = () => {
    isOpen.set(true);
  }

  const handleClose = () => {
    isOpen.set(false);
  }
  const handleRegister = () => {
    navigate("/registro");
  };

  const handleForgotPassword = () => {
    navigate("/olvide-mi-contrasena");
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handleFacebookLogin = async () => {
    await loginWithFacebook();
  };
  return (
    <>
      <Button variant={"text"}
              size={"large"}
              color={"primary"}
              onClick={handleOpen}
      >
        <SemiBold14>
          Inicia sesi&oacute;n
        </SemiBold14>
      </Button>
      <Dialog
        open={isOpen.get()}
        onClose={handleClose}
        PaperProps={{ sx: style.dialog }}
      >
        <DialogTitle>
          <SemiBold14>
            Inicia sesi&oacute;n
          </SemiBold14>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon className="w-6 h-6" />
        </IconButton>
        <DialogContent        >
          <SignInOptions
            handleRegister={handleRegister}
            handleForgotPassword={handleForgotPassword}
            handleGoogleLogin={handleGoogleLogin}
            handleFacebookLogin={handleFacebookLogin}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

const style = {
  dialog: {
    minHeight: "200px",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0, paddingBottom: 4
  },
}
export default LoginDialog;