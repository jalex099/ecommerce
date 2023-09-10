import { useUIState } from "#/hooks/UIState";
import { Button } from "primereact/button";

const LoginButton = () => {
  const ui = useUIState();

  return (
    <Button
      onClick={ui?.toogleLoginDialog}
      icon="pi pi-user"
      rounded
      text
      raised
      aria-label="GoogleSignIn"
    />
  );
};

export default LoginButton;
