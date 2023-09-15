import ThemeSwitch from "#/components/shared/ThemeSwitch.jsx";
import { useLocation } from "react-router-dom";
import GoBackButton from "#/components/shared/GoBackButton.jsx";
import LoginButton from "#/components/domain/auth/LoginButton.jsx";
import { useUIState } from "#/hooks/UIState.js";
import { useEffect } from "react";
import LoggedAvatar from "#/components/domain/auth/LoggedAvatar.jsx";
import Logo from "#/components/shared/Logo.jsx";
import MoreActionsComponent from "#/components/shared/MoreActionsComponent.jsx";
const TopBar = () => {
  const { pathname } = useLocation();
  const ui = useUIState();
  useEffect(() => {

  }, [ui?.isAuthenticated]);
  return (
    <nav className="flex flex-row justify-between items-center w-full h-16 p-2 relative" style={{ backgroundColor: "var(--surface-0)" }}>
      {pathname !== "/" && <GoBackButton />}
      {pathname === "/" && <Logo />}
      {/*<ThemeSwitch />*/}
      <MoreActionsComponent />

    </nav>
  );
};

export default TopBar;
