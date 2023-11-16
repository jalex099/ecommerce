import { Outlet } from "react-router-dom";
import { useUIState } from "#/stores/UIState.js";
import TopBarContainer from "#/components/shared/topbar/TopBarContainer.jsx";
import BottomBarContainer from "#/components/shared/bottombar/BottomBarContainer.jsx";
import AuthService from "#/services/AuthService.js";
import { useEffect } from "react";
import Loading from "#/components/shared/Loading.jsx";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "#/config/constants";
import CartService from "#/services/CartService.js";
import { useAuthState } from "#/stores/AuthState";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
const LayoutPage = () => {
  const ui = useUIState();
  const { verifyAuth } = AuthService();
  const auth = useAuthState();
  const { initCarts } = CartService();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (auth?.isVerified && auth?.isAuthenticated) {
      initCarts();
    }
  }, [auth?.isVerified, auth?.isAuthenticated]);

  return (
    <>
      <header>
        <TopBarContainer />
      </header>
      <main className="container relative" style={{ paddingBottom: "96px" }}>
        <Outlet />
        {ui?.isLoadingForeground && <Loading />}
        {/* <Toaster
        toastOptions={{
          style: {
            background: "var(--surface-100)",
            color: "var(--surface-900)",
          },
        }}
      /> */}
        {/*
        DIALOGS GLOBALES
    */}
      </main>
      <footer className="fixed bottom-0 left-0 right-0">
        <BottomBarContainer />
      </footer>
    </>
  );
};

export default LayoutPage;
