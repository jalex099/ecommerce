import { Button } from "primereact/button";
import AuthService from "#/services/AuthService.js";

const LogoutButton = () => {
  const { logout } = AuthService();
  const handleLogout = () => {
    logout();
  };
  return (
    <Button
      onClick={handleLogout}
      label="Cerrar sesi&oacute;n"
      className="text-xs"
      rounded/>
  )
}

export default LogoutButton;