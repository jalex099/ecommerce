import Button from "@mui/material/Button";
import GoogleImage from "#/assets/images/google.png";
import AuthService from "#/services/AuthService";

function GoogleLoginButton() {
  const { loginWithGoogle } = AuthService();
  return (
    <Button
      variant="outlined"
      onClick={loginWithGoogle}
      className="w-2/3"
      startIcon={<img src={GoogleImage} alt="Google" className="w-6" />}
    >
      Contin&uacute;a con Google
    </Button>
  );
}

export default GoogleLoginButton;
