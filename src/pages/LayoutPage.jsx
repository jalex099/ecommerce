import { Outlet } from "react-router-dom";
import TopBar from "#/components/shared/TopBar.jsx";
import Loading from "#/components/shared/Loading.jsx";
import { useUIState } from "#/hooks/UIState.js";
import LoginDialog from "#/components/domain/auth/LoginDialog.jsx";
const LayoutPage = () => {
  const ui = useUIState();
  return (
    <>
      <header>
        <TopBar />
      </header>
      <main className="container p-2">
        <section style={style.body}>
          <Outlet />
        </section>
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

        <LoginDialog />
      </main>
    </>
  );
};

const style = {
  container: {},
};

export default LayoutPage;
