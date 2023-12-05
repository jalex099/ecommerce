import Button from "@mui/material/Button";
import FacebookImage from "#/assets/images/facebook.png";

function FacebookLoginButton({ handleFacebookLogin }) {
  return (
    <Button
      variant="outlined"
      onClick={handleFacebookLogin}
      startIcon={<img src={FacebookImage} alt="Facebook" className="w-6" />}
    >
      Contin&uacute;a con Facebook
    </Button>
  );
}

export default FacebookLoginButton;
