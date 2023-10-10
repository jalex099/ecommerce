import SemiBold18 from "#/components/shared/fonts/SemiBold18";
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

const ITEM_HEIGHT = 48;
function ProfileTopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = AuthService();

  const options = [
    {
      name: "Ajustes",
      action: () => {
        handleClose();
      },
    },
    {
      name: "Cerrar sesión",
      action: () => {
        logout();
        handleClose();
      },
    },
  ];

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar>
          <GoBackIcon />
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
              onClose={handleClose}
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
