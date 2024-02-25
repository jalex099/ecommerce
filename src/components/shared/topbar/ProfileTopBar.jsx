import Regular14 from "#/components/shared/fonts/Regular14";
import GoBackIcon from "#/components/shared/GoBackIcon";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import AuthService from "#/services/AuthService.js";
import ConfirmDialog from "#/components/shared/ConfirmDialog";
import { useHookstate } from "@hookstate/core";

const ITEM_HEIGHT = 48;
function ProfileTopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openConfirmDialog = useHookstate(false);
  const { logout } = AuthService();

  const options = [
    {
      name: "Ajustes",
      action: () => {
        handleCloseMenu();
      },
    },
    {
      name: "Cerrar sesión",
      action: () => {
        handleOpenConfirmDialog();
        handleCloseMenu();
      },
    },
  ];

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmDialog = () => {
    openConfirmDialog.set(true);
  };

  const handleCloseConfirmDialog = () => {
    openConfirmDialog.set(false);
  };

  const handleLogout = async () => {
    await logout();
    handleCloseConfirmDialog();
  };

  return (
    <Box className={"flex justify-center"}>
      <ConfirmDialog
        isOpen={openConfirmDialog?.value}
        title="Cerrar sesión"
        content="¿Estás seguro que deseas cerrar sesión?"
        handleOk={handleLogout}
        handleCancel={handleCloseConfirmDialog}
        onClose={handleCloseConfirmDialog}
      />
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar className={"w-full lg:w-[1000px]"}>
          <IconButton
            aria-label="go-back"
            variant="contained"
            className="w-8 h-8"
          >
            <GoBackIcon />
          </IconButton>
          <p></p>
          <Box>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option?.name}
                  // selected={option === "Ajustes"}
                  onClick={option?.action}
                >
                  <Regular14>{option?.name}</Regular14>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default ProfileTopBar;
