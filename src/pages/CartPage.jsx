import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import { useCartState } from "#/stores/cart";
import { useMemo } from "react";

function CartPage() {
  const ui = useUIState();
  const { get } = useCartState();

  useEffect(() => {
    ui?.setTitle("Carrito");
  }, []);

  useEffect(() => {
    console.log(get());
  }, []);

  const items = useMemo(() => {
    return get();
  }, []);

  return (
    <Container sx={style.container}>
      <HelmetMeta page="cart" />
      {items &&
        items.map((item, index) => {
          console.log(item);
          return (
            <div key={index}>
              <p>{item?.name}</p>
              <p>{item?.price}</p>
            </div>
          );
        })}
    </Container>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
};

export default CartPage;
