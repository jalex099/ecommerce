import { Button } from "primereact/button";
import AuthService from "#/services/AuthService.js";

const GoogleLoginButton = ()=> {
  const { loginWithGoogle } = AuthService();
  const handleGoogleLogin = async () => {
    try{
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button rounded icon='pi pi-google' raised text
      onClick={handleGoogleLogin}
    />
  )
}

export default GoogleLoginButton;