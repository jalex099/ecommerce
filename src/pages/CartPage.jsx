import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import { useCartState } from "#/stores/cart";
import { useMemo } from "react";
import CartItemsContainer from "#/components/domain/cart/CartItemsContainer";
import CartResumeInfo from "#/components/domain/cart/CartResumeInfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Regular16 from "#/components/shared/fonts/Regular16";
import Regular20 from "#/components/shared/fonts/Regular20";
import { useNavigate } from "react-router-dom";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import DataService from "#/services/DataService";

function CartPage() {
  const ui = useUIState();
  const cart = useCartState();
  const { getItemsToShow, handleRemoveFromCart, getDetails, getProductTotal } =
    useCartUtils();
  const navigate = useNavigate();
  const { isLoading } = DataService();

  useEffect(() => {
    ui?.setTitle("Carrito");
  }, []);

  const itemsToShow = useMemo(
    () => getItemsToShow(),
    [cart?.getItemsCounter(), isLoading]
  );

  const handleGoToMenu = () => {
    navigate("/menu", { replace: true });
  };

  return (
    <Box sx={style.container}>
      <HelmetMeta page="cart" />
      {itemsToShow == undefined && !isLoading && (
        <Box className="flex flex-col items-center justify-center text-center gap-2 px-6 py-2">
          <img
            src="/images/empty-cart.svg"
            alt="Carrito vacío"
            className="w-48"
          />
          <Regular20>Tu carrito est&aacute; vac&iacute;o</Regular20>
          <Regular16>
            Agrega productos a tu carrito para continuar con la compra
          </Regular16>
          <Button variant="contained" color="primary" onClick={handleGoToMenu}>
            Ver men&uacute;
          </Button>
        </Box>
      )}
      {!!itemsToShow && itemsToShow?.length > 0 && (
        <>
          <CartItemsContainer
            products={itemsToShow}
            getDetails={getDetails}
            onRemoveItem={handleRemoveFromCart}
          />
          <CartResumeInfo
            numberOfItems={cart?.getItemsCounter()}
            products={itemsToShow}
            subtotal={cart?.getSubTotal()}
            discount={cart?.getDescuento()}
            total={cart?.getTotal()}
          />
        </>
      )}
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    minHeight: "calc(100vh - 70px)",
    paddingTop: "16px",
    flexGrow: 1,
  },
};

export default CartPage;
