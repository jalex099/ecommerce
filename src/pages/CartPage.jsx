import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import { useCartState, cartCounter } from "#/stores/cart";
import { useMemo } from "react";
import CartItemsContainer from "#/components/domain/cart/CartItemsContainer";
import CartResumeInfo from "#/components/domain/cart/CartResumeInfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Regular16 from "#/components/shared/fonts/Regular16";
import Regular20 from "#/components/shared/fonts/Regular20";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const ui = useUIState();
  const { get, getTotal, getSubTotal, getDescuento } = useCartState();
  const navigate = useNavigate();

  useEffect(() => {
    ui?.setTitle("Carrito");
  }, []);

  const items = useMemo(() => {
    return get();
  }, []);

  const numberOfItems = useMemo(() => {
    return cartCounter(items);
  }, [items]);

  const handleGoToMenu = () => {
    navigate("/menu", { replace: true });
  };
  console.log(getTotal());

  return (
    <Box sx={style.container}>
      <HelmetMeta page="cart" />
      {items?.length === 0 && (
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
      {items?.length > 0 && (
        <>
          <CartItemsContainer products={items} />
          <CartResumeInfo
            numberOfItems={numberOfItems}
            products={items}
            subtotal={getSubTotal()}
            total={getTotal()}
            discount={0}
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
