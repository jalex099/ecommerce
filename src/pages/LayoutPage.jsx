import { Outlet } from "react-router-dom";
import { useUIState } from "#/hooks/UIState.js";
import TopBarContainer from "#/components/shared/topbar/TopBarContainer.jsx";
import BottomBarContainer from "#/components/shared/bottombar/BottomBarContainer.jsx";
import AuthService from "#/services/AuthService.js";
import { useEffect } from "react";
import Loading from "#/components/shared/Loading.jsx";
const LayoutPage = () => {
  const ui = useUIState();
  const { verifyAuth } = AuthService();

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <>
      <header>
        <TopBarContainer />
      </header>
      <main className="container relative" style={{ paddingBottom: "80px" }}>
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
      <footer>
        <BottomBarContainer />
      </footer>
    </>
  );
};

export default LayoutPage;
