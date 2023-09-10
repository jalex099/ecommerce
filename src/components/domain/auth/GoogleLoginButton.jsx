import { Button } from "primereact/button";
import AuthService from "#/services/AuthService.js";
import GooglePng from "#/assets/images/google.png";

const GoogleLoginButton = () => {
  const { loginWithGoogle } = AuthService();
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button rounded onClick={handleGoogleLogin} className="w-full">
      <img alt="logo" src={GooglePng} className="h-8"></img>
    </Button>
  );
};

export default GoogleLoginButton;
