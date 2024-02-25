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
import ImportCartContainer from "#/components/domain/cart/ImportCartContainer";
import { useAuthState } from "#/stores/AuthState";
import AllowSyncronizationDialog from "#/components/domain/cart/AllowSyncronizationDialog";
import ChangeSelectedCartDialog from "#/components/domain/cart/ChangeSelectedCartDialog";

const ITEM_HEIGHT = 48;
function CartTopBar({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenShareDialog = useHookstate(false);
  const isOpenImportDialog = useHookstate(false);
  const isOpenAllowSyncronizationDialog = useHookstate(false);
  const isOpenChangeSelectedCartDialog = useHookstate(false);
  const openConfirmDialog = useHookstate(false);
  const { handleRemoveAllFromCart } = useCartUtils();
  const cart = useCartState();
  const navigate = useNavigate();
  const auth = useAuthState();

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

  const handleImportCart = () => {
    handleCloseMenu();
    isOpenImportDialog.set(true);
  };

  const handleCloseImportDialog = () => {
    isOpenImportDialog.set(false);
  };

  const handleShareCart = () => {
    handleCloseMenu();
    isOpenShareDialog.set(true);
  };

  const handleCloseShareDialog = () => {
    isOpenShareDialog.set(false);
  };

  const handleOpenConfirmDialog = () => {
    openConfirmDialog.set(true);
  };

  const handleCloseConfirmDialog = () => {
    openConfirmDialog.set(false);
  };

  const handleSyncronization = () => {
    handleCloseMenu();
    handleOpenAllowSyncronizationDialog();
  };

  const handleOpenAllowSyncronizationDialog = () => {
    isOpenAllowSyncronizationDialog.set(true);
  };

  const handleCloseAllowSyncronizationDialog = () => {
    isOpenAllowSyncronizationDialog.set(false);
  };

  const handleOpenChangeSelectedCartDialog = () => {
    isOpenChangeSelectedCartDialog.set(true);
  };

  const handleCloseChangeSelectedCartDialog = () => {
    isOpenChangeSelectedCartDialog.set(false);
  };

  const handleChangeCart = () => {
    handleCloseMenu();
    handleOpenChangeSelectedCartDialog();
  };

  const handleRemoveAllFromCartThis = () => {
    handleRemoveAllFromCart();
    handleCloseConfirmDialog();
  };

  const handleGoToProfile = () => {
    handleCloseShareDialog();
    handleCloseImportDialog();
    handleCloseAllowSyncronizationDialog();
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
                {auth?.isAuthenticated && auth?.isVerified && (
                  <MenuItem onClick={handleChangeCart}>
                    <Regular14>Carritos guardados</Regular14>
                  </MenuItem>
                )}
                {auth?.isAuthenticated &&
                  auth?.isVerified &&
                  cart?.getItemsCounter() > 0 &&
                  cart?.getCartId() === null &&
                  cart?.getCartCode() === null &&
                  !cart?.getSyncable() && (
                    <MenuItem onClick={handleSyncronization}>
                      <Regular14>Habiliar sincronizacion</Regular14>
                    </MenuItem>
                  )}
                <MenuItem onClick={handleImportCart}>
                  <Regular14>Importar</Regular14>
                </MenuItem>

                {cart?.getItemsCounter() > 0 && (
                  <MenuItem onClick={handleShareCart}>
                    <Regular14>Compartir</Regular14>
                  </MenuItem>
                )}
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
      <ShareCartContainer
        isOpen={isOpenShareDialog.get()}
        handleClose={handleCloseShareDialog}
        handleGoToProfile={handleGoToProfile}
      />
      <ImportCartContainer
        isOpen={isOpenImportDialog.get()}
        handleClose={handleCloseImportDialog}
        handleGoToProfile={handleGoToProfile}
      />
      <AllowSyncronizationDialog
        isOpen={isOpenAllowSyncronizationDialog.get()}
        handleClose={handleCloseAllowSyncronizationDialog}
      />
      <ChangeSelectedCartDialog
        isOpen={isOpenChangeSelectedCartDialog.get()}
        handleClose={handleCloseChangeSelectedCartDialog}
        cart={cart?.get()}
      />
    </>
  );
}

export default CartTopBar;
