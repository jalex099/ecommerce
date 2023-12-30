import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import DataService from "#/services/DataService.js";
import CartService from "#/services/CartService.js";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import { useCartState } from "#/stores/cart";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import OverwriteCartDetail from "#/components/domain/cart/OverwriteCartDetail.jsx";
import Box from "@mui/material/Box";
import { parseMenu } from "#/utils/adapterUtil/cartAdapterUtil";

export default function OverwriteCartContainer() {
  const isOpen = useHookstate(false);
  const { menu } = DataService();
  const cart = useCartState();
  const { carts, saveCart, deleteCart } = CartService();
  const { fillFromApi } = useCartUtils();

  useEffect(() => {
    if (!carts || carts?.length <= 0 || !menu) return;
    if (cart?.getCartId() !== null) return;
    if (cart?.getItemsCounter() === 0) {
      handleOverwrite();
      return;
    }
    isOpen?.set(true);
    // fillFromApi(carts[0]);
  }, [carts?.length, menu?.length]);

  const handleKeepCurrent = async () => {
    isOpen?.set(false);
    await Promise.all(
      carts.map((element) => {
        return deleteCart?.mutate(element._id);
      })
    );
    await saveCart?.mutate({
      _id: null,
      status: "ACT",
      visibility: "PUBLIC",
      menu: parseMenu(cart?.getItems()),
    });
  };

  const handleOverwrite = () => {
    isOpen?.set(false);
    fillFromApi(carts[0]);
  };

  return (
    <Dialog open={isOpen?.get()} disableEscapeKeyDown>
      <DialogTitle>
        <SemiBold14>Sobreescribir carrito</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Regular14>
          Encontramos que en tu cuenta tienes un carrito guardado, ¿deseas
          sobreescribir el carrito actual con el que tienes guardado?
        </Regular14>
        <Box className="flex flex-col justify-center items-start gap-4 mt-4">
          {!!cart && (
            <>
              <SemiBold14>Carrito actual</SemiBold14>
              <OverwriteCartDetail isLocal cart={cart} />
            </>
          )}

          {carts?.length > 0 && (
            <>
              <SemiBold14>Carrito(s) guardado(s)</SemiBold14>
              {carts?.map((element, index) => {
                return <OverwriteCartDetail key={index} cart={element} />;
              })}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions className="flex flex-row " sx={{ gap: "4px" }}>
        <Button
          onClick={handleKeepCurrent}
          variant="outlined"
          className="flex-grow"
        >
          Mantener actual
        </Button>
        <Button
          onClick={handleOverwrite}
          variant="contained"
          color="primary"
          autoFocus
          className="flex-grow"
        >
          Sobreescribir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
