import HideOnScroll from "#/components/shared/HideOnScroll.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FeedTopBar from "#/components/shared/topbar/FeedTopBar.jsx";
import DefaultTopBar from "#/components/shared/topbar/DefaultTopBar.jsx";
import MenuTopBar from "#/components/shared/topbar/MenuTopBar.jsx";
import { useUIState } from "#/hooks/UIState.js";
import { useLocation } from "react-router-dom";

function TopBarContainer(props) {
  const ui = useUIState();
  const { pathname } = useLocation();
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="neutral0">
          {pathname === "/" ? (
            <FeedTopBar title={ui?.title} />
          ) : pathname === "/menu" ? (
            <MenuTopBar />
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
