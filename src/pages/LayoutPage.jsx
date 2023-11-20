import { Outlet } from "react-router-dom";
import { useUIState } from "#/stores/UIState.js";
import TopBarContainer from "#/components/shared/topbar/TopBarContainer.jsx";
import BottomBarContainer from "#/components/shared/bottombar/BottomBarContainer.jsx";
import AuthService from "#/services/AuthService.js";
import { useEffect, useMemo } from "react";
import Loading from "#/components/shared/Loading.jsx";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "#/config/constants";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { BOTTOM_BAR_HIDDEN_PATHS } from "#/config/constants";
import { useCartState } from "#/stores/cart.js";
import DataService from "#/services/DataService.js";
import ErrorFetchPage from "#/pages/ErrorFetchPage.jsx";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
const LayoutPage = () => {
  const ui = useUIState();
  const { verifyAuth } = AuthService();
  const { pathname } = useLocation();
  const cart = useCartState();
  const { isError, isLoading, isRefetching, isFetching, isSuccess, refetch } =
    DataService();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    cart?.addSubTotal();
    cart?.addTotal();
    cart?.addToLocalStorage();
  }, [cart?.hash]);

  const isHidden = useMemo(() => {
    return BOTTOM_BAR_HIDDEN_PATHS.some((path) => pathname.startsWith(path));
  }, [pathname]);

  return (
    <>
      {isSuccess && (
        <>
          <header>
            <TopBarContainer />
          </header>
          <Box
            component="main"
            className="container relative"
            sx={{
              paddingBottom: !isHidden && "96px",
              bgcolor: (theme) =>
                pathname === "/cart" && theme.palette.neutral5.main,
            }}
          >
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
          </Box>
          <footer className="fixed bottom-0 left-0 right-0">
            <BottomBarContainer />
          </footer>
        </>
      )}
      {!isRefetching && isLoading && isFetching && <Loading />}
      {isError && <ErrorFetchPage refetch={refetch} />}
    </>
  );
};

export default LayoutPage;
