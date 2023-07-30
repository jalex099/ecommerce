import { Outlet } from "react-router-dom";
import TopBar from "#/components/shared/TopBar.jsx";
import Loading from "#/components/shared/Loading.jsx";
import { useUIState } from "#/hooks/UIState.js";
const LayoutPage = () => {
  const ui = useUIState();
  return (
    <>
      <header>
        <TopBar />
      </header>
      <main className="container p-6">
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
        {/* <NewConsultContainer /> */}
      </main>
    </>
  );
};

const style = {
  container: {},
};

export default LayoutPage;
