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
    <Button rounded onClick={handleGoogleLogin} className="w-2/3 flex justify-center" severity="secondary" outlined>
      <img alt="googleicon" src={GooglePng} className="h-6"></img>
    </Button>
  );
};

export default GoogleLoginButton;
