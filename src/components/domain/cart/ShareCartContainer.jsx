import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useHookstate } from "@hookstate/core";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular16 from "#/components/shared/fonts/Regular16";
import { motion } from "framer-motion";
import SemiBold24 from "#/components/shared/fonts/SemiBold24";
import Box from "@mui/material/Box";
import useLongPress from "#/hooks/useLongPress";
import { addToast } from "#/stores/UIState.js";
import Regular12 from "#/components/shared/fonts/Regular12";
import { useCartState } from "#/stores/cart";
import { useEffect } from "react";
import { useAuthState } from "#/stores/AuthState";

export default function ShareCartContainer({
  isOpen,
  handleClose,
  handleGoToProfile,
}) {
  const cart = useCartState();
  const auth = useAuthState();
  const code = useHookstate(null);
  const isCopied = useHookstate(false);

  useEffect(() => {
    code?.set(cart?.getCartCode());
  }, [cart?.getCartCode()]);

  const handleLongPress = () => {
    navigator.clipboard.writeText(code.get());
    isCopied.set(true);
    // addToast("Código copiado al portapapeles", "success");
  };

  const backspaceLongPress = useLongPress(handleLongPress, 500);
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: style.dialog }}
    >
      <DialogTitle>
        <SemiBold14>Compartir carrito</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-10 mb-8 w-full justify-center items-center">
          <Regular16>
            Comparte el c&oacute;digo de tu carrito para que puedan agregar tus
            productos a su carrito.
          </Regular16>
          {auth?.isAuthenticated && cart?.getCartId() && (
            <>
              <Box
                className="w-full flex flex-col items-center justify-center gap-4 "
                sx={{
                  color: (theme) =>
                    isCopied?.get()
                      ? theme.palette.primary120.main
                      : theme.palette.neutral100.main,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  {...backspaceLongPress}
                >
                  {code?.get() && (
                    <SemiBold24 className="select-none text-center ">
                      {code.get()}
                    </SemiBold24>
                  )}
                </motion.div>
              </Box>
              <Regular12
                className="w-full  text-center"
                styles={{ color: (theme) => theme.palette.opacity60.main }}
              >
                Mant&eacute;n presionado el c&oacute;digo para copiarlo al
                portapapeles
              </Regular12>
            </>
          )}
          {auth?.isAuthenticated && !cart?.getCartId() && (
            <Regular12>
              Debes guardar el carrito para poder compartirlo
            </Regular12>
          )}
            {!auth?.isAuthenticated && (
            <>
              <Regular12>
                Para compartir tu carrito debes{" "}
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
    width: "100%",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  link: {
    color: (theme) => theme.palette.primary120.main,
    cursor: "pointer",
  },
};
