import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular16 from "#/components/shared/fonts/Regular16";
import Box from "@mui/material/Box";
import { useAuthState } from "#/stores/AuthState";
import TextField from "@mui/material/TextField";
import Regular12 from "#/components/shared/fonts/Regular12";
import { useRef } from "react";
import Button from "@mui/material/Button";
import CartService from "#/services/CartService.js";

export default function ImportCartContainer({
  isOpen,
  handleClose,
  handleGoToProfile,
}) {
  const auth = useAuthState();
  const codeRef = useRef(null);
  const { cloneCart } = CartService();

  const handleCloneCart = () => {
    const code = codeRef.current.value;
    cloneCart?.mutate(code, {
      onSuccess: () => {
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
        <SemiBold14>Importar carrito</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-10 mb-8 w-full justify-center items-center">
          <Regular16>
            Ingresa el c&oacute;digo de un carrito existente para agregar sus
            productos a tu carrito.
          </Regular16>
          {auth?.isAuthenticated && (
            <>
              <TextField
                label="Código de carrito"
                name="code"
                variant="standard"
                autoComplete="off"
                sx={{ width: "100%" }}
                inputRef={codeRef}
                autoFocus={isOpen}
              />
              <Button
                variant="contained"
                color="primary"
                className="w-full"
                onClick={handleCloneCart}
              >
                <Regular12>Importar a mi carrito</Regular12>
              </Button>
            </>
          )}
          {!auth?.isAuthenticated && (
            <>
              <Regular12>
                Para importar a tu carrito debes{" "}
                <Box
                  component={"span"}
                  onClick={handleGoToProfile}
                  sx={style.link}
                >
                  iniciar sesi&oacute;n
                </Box>
              </Regular12>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
const style = {
  dialog: {
    minHeight: "200px",
    width: "100%",
    position: { xs: "absolute", lg: "relative" },
    bottom: 0,
    left: 0,
    right: 0,
  },
  link: {
    color: (theme) => theme.palette.primary120.main,
    cursor: "pointer",
  },
};
