import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular16 from "#/components/shared/fonts/Regular16";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import useCartSyncUtils from "#/components/domain/cart/controllers/useCartSyncUtils";
import { useCartState } from "#/stores/cart";
import { useQueryClient } from "@tanstack/react-query";

const AllowSyncronizationDialog = ({ isOpen, handleClose }) => {
  const nameRef = useRef(null);
  const { saveCartFirstTime } = useCartSyncUtils();
  const cart = useCartState();
  const queryClient = useQueryClient();


  const handleSyncCart = () => {
    const name = nameRef?.current?.value;
    saveCartFirstTime({
      name,
      onSuccess: () => {
        cart?.setSyncable(true);
        queryClient.invalidateQueries(["auth_getCarts"], {});
        handleClose();
      },
    });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: style.dialog }}
    >
      <DialogTitle>
        <SemiBold14>Sincronizar carrito</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-4 w-full justify-center items-center">
          <Regular16>
            La sincronizaci&oacute;n de carritos te permite mantener un carrito
            en m&uacute;ltiples dispositivos y acceder a &eacute;l desde
            cualquier lugar.
          </Regular16>
          <TextField
            label="Nombre de carrito"
            name="cartName"
            variant="standard"
            autoComplete="off"
            sx={{ width: "100%" }}
            inputRef={nameRef}
            autoFocus={isOpen}
          />
        </Box>
      </DialogContent>
      <DialogActions className="flex flex-row " sx={{ gap: "4px" }}>
        <Button
          onClick={handleSyncCart}
          variant="contained"
          className="flex-grow"
        >
          Sincronizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AllowSyncronizationDialog;

const style = {
  dialog: {
    minHeight: "200px",
    width: "100%",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  link: {
    color: (theme) => theme.palette.primary120.main,
    cursor: "pointer",
  },
};
