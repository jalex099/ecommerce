import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useHookstate } from "@hookstate/core";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import HideOnScroll from "#/components/shared/HideOnScroll.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BOTTOM_BAR_HIDDEN_PATHS } from "#/config/constants";
import RedirectionService from "#/services/RedirectionService";

function BottomBarContainer() {
  const value = useHookstate(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { redirectToFirstCategory } = RedirectionService();

  useEffect(() => {
    if (pathname === "/") value.set(0);
    else if (pathname.startsWith("/menu")) value.set(1);
    else if (
      pathname.startsWith("/perfil") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/registro") ||
      pathname.startsWith("/olvide-mi-contrasena")
    )
      value.set(2);
    else value.set(0);
  }, [pathname]);
  const handleChange = (e, newValue) => {
    const isAllowedAction = value?.get() !== newValue;
    if (!isAllowedAction) return;
    value.set(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        redirectToFirstCategory();
        break;
      case 2:
        navigate("/perfil");
        break;
      default:
        break;
    }
  };

  const isHidden = useMemo(() => {
    return BOTTOM_BAR_HIDDEN_PATHS.some((path) => pathname.startsWith(path));
  }, [pathname]);

  if (isHidden) return <></>;
  return (
    <HideOnScroll direction="up">
      <Paper
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
        }}
        className="flex justify-around items-center grow"
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value.get()}
          onChange={handleChange}
          className="px-4"
          sx={{ flexGrow: 1, height: "100%" }}
        >
          <BottomNavigationAction label="Feed" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction
            label="Men&uacute;"
            icon={<RestaurantMenuOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Perfil"
            icon={<PermIdentityOutlinedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </HideOnScroll>
  );
}

export default BottomBarContainer;
