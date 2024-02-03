import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import SemiBold20 from "#/components/shared/fonts/SemiBold20";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState.js";
import OrderService from "#/services/OrderService.js";
import { useHookstate } from "@hookstate/core";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import SemiBold24 from "#/components/shared/fonts/SemiBold24.jsx";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const ui = useUIState();
  const { id} = useParams();
  const {getOrder} = OrderService();
  const order = useHookstate(null);

  useEffect(() => {
    ui?.setTitle("Confirmación de orden");
  }, []);

  useEffect(() => {
    getOrder?.mutate(id, {
      onSuccess: ({ data }) => {
        order.set(data);
      },
    })
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <Container sx={style.container}>
      <HelmetMeta page="orderConfirmation" />
      <Box className={"flex flex-col gap-4 "}>
        <Box className={"flex gap-0 flex-col"}>
          <SemiBold24>
            ¡Gracias por tu compra!
          </SemiBold24>
          <SemiBold14>
            Tu pedido ha sido confirmado.
          </SemiBold14>
        </Box>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
};

const style = {
  container: {
    height: "100%",
  },
};

export default OrderConfirmationPage;
