import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";
import GoBackIcon from "#/components/shared/GoBackIcon";
import IconButton from "@mui/material/IconButton";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import ShareCartContainer from "#/components/domain/cart/ShareCartContainer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Regular14 from "#/components/shared/fonts/Regular14";
import { useHookstate } from "@hookstate/core";
import ConfirmDialog from "#/components/shared/ConfirmDialog";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import { useCartState } from "#/stores/cart";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "#/stores/AuthState";

const ITEM_HEIGHT = 48;
function CartTopBar({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openConfirmDialog = useHookstate(false);
  const { handleRemoveAllFromCart } = useCartUtils();
  const cart = useCartState();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEmptyCart = () => {
    handleCloseMenu();
    handleOpenConfirmDialog();
  };


  const handleOpenConfirmDialog = () => {
    openConfirmDialog.set(true);
  };

  const handleCloseConfirmDialog = () => {
    openConfirmDialog.set(false);
  };


  const handleRemoveAllFromCartThis = () => {
    handleRemoveAllFromCart();
    handleCloseConfirmDialog();
  };

  const handleGoToProfile = () => {
    handleCloseMenu();
    navigate("/perfil");
  };

  return (
    <>
      <ConfirmDialog
        isOpen={openConfirmDialog?.value}
        title="Vaciar carrito"
        content="¿Estás seguro que deseas realizar esta acción?"
        confirmText="Sí, vaciar"
        cancelText="Cancelar"
        handleOk={handleRemoveAllFromCartThis}
        handleCancel={handleCloseConfirmDialog}
        onClose={handleCloseConfirmDialog}
      />
      <Box className={"flex justify-center"}>
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
            {title ? (
              <SemiBold18 className="text-center">{title}</SemiBold18>
            ) : (
              <Box />
            )}
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
                    minWidth: "15ch",
                  },
                }}
              >
                {cart?.getItemsCounter() > 0 && (
                  <MenuItem onClick={handleEmptyCart}>
                    <Regular14>Vaciar</Regular14>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Fade>
      </Box>
    </>
  );
}

export default CartTopBar;
