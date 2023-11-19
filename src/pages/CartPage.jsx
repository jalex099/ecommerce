import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import { useCartState } from "#/stores/cart";
import { useMemo } from "react";
import CartItemsContainer from "#/components/domain/cart/CartItemsContainer";
import CartResumeInfo from "#/components/domain/cart/CartResumeInfo";

function CartPage() {
  const ui = useUIState();
  const { get} = useCartState();

  useEffect(() => {
    ui?.setTitle("Carrito");
  }, []);

  const items = useMemo(() => {
    return get();
  }, []);

  return (
    <Container sx={style.container}>
      <HelmetMeta page="cart" />
      <CartItemsContainer products={items} />
      <CartResumeInfo/>
    </Container>
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
  },
};

export default CartPage;
