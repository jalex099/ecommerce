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
import ClientPreferenceService from "#/services/ClientPreferenceService.js";
import ToasterCustom from "#/components/shared/ToasterCustom.jsx";
import CartService from "#/services/CartService.js";
import useCartSyncUtils from "#/components/domain/cart/controllers/useCartSyncUtils.js";
import { useLocationState } from "#/stores/LocationState.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
const LayoutPage = () => {
  const ui = useUIState();
  const { verifyAuth } = AuthService();
  const { pathname } = useLocation();
  const cart = useCartState();
  const { isError, isLoading, isRefetching, isFetching, isSuccess, refetch } =
    DataService();
  const { isSuccess: isSuccessPreferences } = ClientPreferenceService();
  const { isLoading: isLoadingCarts, isError: isErrorCarts } = CartService();
  const { saveCartExisting } = useCartSyncUtils();
  const location = useLocationState();
  const checkout = useCheckoutState();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!isSuccessPreferences) return;
  }, [isSuccessPreferences]);

  useEffect(() => {
    // if (!isSuccess) return;
    cart?.addSubTotal();
    cart?.addTotal();
    cart?.addToLocalStorage();
  }, [cart?.hash()]);

  useEffect(() => {
    location?.addToLocalStorage();
  }, [location?.hash()])

  useEffect(() => {
    checkout?.addToLocalStorage();
  }, [checkout?.hash()])

  useEffect(() => {
    cart?.setDirty(true);
  }, [cart?.getItemsCounter()]);

  useEffect(() => {
    if (isLoadingCarts || isErrorCarts || cart?.getItemsCounter() < 0) return;
    if (!cart?.getSyncable()) return;
    if (pathname === "/carrito") return;
    if (!cart?.getDirty()) return;
    saveCartExisting({
      onSuccess: () => {
        cart?.setDirty(false);
        cart?.setSyncable(true);
      },
    });
  }, [cart?.getItemsCounter(), pathname]);

  const isHidden = useMemo(() => {
    return BOTTOM_BAR_HIDDEN_PATHS.some((path) => pathname.startsWith(path));
  }, [pathname]);

  return (
    <>
      {isSuccess && (
        <>
          <header className={"flex"}>
            <TopBarContainer />
          </header>
          <Box
            component="main"
            className="container relative mx-auto"
            sx={{
              paddingBottom: !isHidden && "96px",
              flex: 1
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
            {/* <OverwriteCartContainer /> */}
            <ToasterCustom />
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
