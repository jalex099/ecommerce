import { Avatar } from "primereact/avatar";
import { findKey } from "#/utils/localStorageHelper.js";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import AuthService from "#/services/AuthService.js";

const LoggedAvatar = () => {
  const user = useHookstate(null);
  const {logout} = AuthService();

  useEffect(() => {
    const userFromLocalStorage = findKey("user");
    user.set(JSON.parse(userFromLocalStorage));
  }, []);

  const handleLogout = () => {
    logout();
  }
  return ( <Avatar image={user.get()?.picture} shape="circle" referrerPolicy="no-referrer" onClick={handleLogout} />)
}

export default LoggedAvatar;