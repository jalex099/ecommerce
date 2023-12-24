import HideOnScroll from "#/components/shared/HideOnScroll.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FeedTopBar from "#/components/shared/topbar/FeedTopBar.jsx";
import DefaultTopBar from "#/components/shared/topbar/DefaultTopBar.jsx";
import MenuTopBar from "#/components/shared/topbar/MenuTopBar.jsx";
import { useUIState } from "#/stores/UIState";
import { useLocation } from "react-router-dom";
import ProfileTopBar from "#/components/shared/topbar/ProfileTopBar.jsx";
import CartTopBar from "./CartTopBar";

function TopBarContainer(props) {
  const ui = useUIState();
  const { pathname } = useLocation();
  // if (pathname === "/profile/add-address") return null;
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color={"neutral0"}>
          {pathname === "/" ? (
            <FeedTopBar title={ui?.title} />
          ) : pathname?.startsWith("/menu/categorias") ? (
            <MenuTopBar />
          ) : pathname === "/cart" ? (
            <CartTopBar title={ui?.title} />
          ) : pathname === "/perfil" ? (
            <ProfileTopBar />
          ) : (
            <DefaultTopBar title={ui?.title} />
          )}
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

export default TopBarContainer;
