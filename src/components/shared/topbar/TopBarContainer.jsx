import HideOnScroll from "#/components/shared/HideOnScroll.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FeedTopBar from "#/components/shared/topbar/FeedTopBar.jsx";
import DefaultTopBar from "#/components/shared/topbar/DefaultTopBar.jsx";
import MenuTopBar from "#/components/shared/topbar/MenuTopBar.jsx";
import { useUIState } from "#/stores/UIState";
import { useLocation } from "react-router-dom";
import ProfileTopBar from "#/components/shared/topbar/ProfileTopBar.jsx";
import CartTopBar from "#/components/shared/topbar/CartTopBar.jsx";
import CheckoutTopBar from "#/components/shared/topbar/CheckoutTopBar.jsx";
import OrdersAndMessageTopBar
  from "#/components/shared/topbar/OrdersAndMessageTopBar.jsx";
import OnlyTitleTopBar from "./OnlyTitleTopBar.jsx";

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
          ) : pathname === "/carrito" ? (
            <CartTopBar title={ui?.title} />
          ) : pathname === "/perfil" ? (
            <ProfileTopBar />
          ) : pathname === "/pago" ? (
            <CheckoutTopBar />
          ) : pathname === "/perfil/ordenes-y-mensajes" ? (
            <OrdersAndMessageTopBar />
          ) : pathname === "/confirmacion-de-pago-en-linea" ? (
            <OnlyTitleTopBar />
          )
          : (
            <DefaultTopBar title={ui?.title} />
          )}
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

export default TopBarContainer;
