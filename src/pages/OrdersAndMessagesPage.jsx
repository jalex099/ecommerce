import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useUIState } from "#/stores/UIState.js";
import { useEffect } from "react";

function OrdersAndMessagesPage() {
  const ui = useUIState();

  useEffect(() => {
    ui?.setTitle("Pedidos y mensajes");
  }, []);

  return (
    <Container sx={style.container}>
      <HelmetMeta page="ordersAndMessages" />
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

export default OrdersAndMessagesPage;
