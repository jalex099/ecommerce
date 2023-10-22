import Button from "@mui/material/Button";
import GoogleImage from "#/assets/images/google.png";
import AuthService from "#/services/AuthService";

function GoogleLoginButton({handleGoogleLogin}) {
  return (
    <Button
      variant="outlined"
      onClick={handleGoogleLogin}
      startIcon={<img src={GoogleImage} alt="Google" className="w-6" />}
    >
      Contin&uacute;a con Google
    </Button>
  );
}

export default GoogleLoginButton;
