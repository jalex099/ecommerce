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
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function ShareCartContainer({
  isOpen,
  handleClose,
  handleGoToProfile,
}) {
  const cart = useCartState();
  const auth = useAuthState();
  const code = useHookstate(null);

  useEffect(() => {
    code?.set(cart?.getCartCode());
  }, [cart?.getCartCode()]);

  const handleLongPress = () => {
    navigator.clipboard.writeText(code.get());
    addToast("Código copiado al portapapeles", "success");
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
          {auth?.isAuthenticated && (
            <>
              <Box className="w-full flex flex-row items-center justify-center gap-4 ">
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
          {!auth?.isAuthenticated && (
            <>
              <Regular12>
                Para compartir tu carrito debes{" "}
                <span onClick={handleGoToProfile}>iniciar sesi&oacute;n</span>
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
  },
};
