import { Outlet } from "react-router-dom";
import { useUIState } from "#/hooks/UIState.js";
import TopBarContainer from "#/components/shared/topbar/TopBarContainer.jsx";
import BottomBarContainer from "#/components/shared/bottombar/BottomBarContainer.jsx";
const LayoutPage = () => {
  const ui = useUIState();
  return (
    <>
      <header>
        <TopBarContainer />
      </header>
      <main
        className="container relative"
        style={{ height: "110vh", paddingBottom: "80px" }}
      >
        <Outlet />
        {ui?.isLoadingForeground && <>lOADING</>}
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
