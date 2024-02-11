import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useUIState } from "#/stores/UIState.js";
import { useEffect } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CategoriesList from "#/components/domain/menu/CategoriesList.jsx";
import { useHookstate } from "@hookstate/core";
import OrdersContainer
  from "#/components/domain/ordersAndMessages/OrdersContainer.jsx";
import MessagesContainer from "#/components/domain/ordersAndMessages/MessagesContainer.jsx";

function OrdersAndMessagesPage() {
  const ui = useUIState();

  useEffect(() => {
    ui?.setTitle("");
  }, []);

  return (
    <Container sx={style?.container}>
      <HelmetMeta page="ordersAndMessages" />
      {
        ui?.ordAndMesTopBarSelection === 1 && <OrdersContainer />
      }
      {
        ui?.ordAndMesTopBarSelection === 2 && <MessagesContainer />
      }
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
    height: '100%'
  },
};

export default OrdersAndMessagesPage;
