import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUIState, addToast } from "#/stores/UIState.js";
import OrderService from "#/services/OrderService.js";
import { useHookstate } from "@hookstate/core";
import Box from "@mui/material/Box";
import OrderDetailContainer from "#/components/domain/ordersAndMessages/OrderDetailContainer.jsx";
const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const ui = useUIState();
  const { id } = useParams();
  const { getOrder } = OrderService();
  const order = useHookstate(null);

  useEffect(() => {
    if (order?.value?.code) ui?.setTitle(order?.value?.code);
    else ui?.setTitle("Confirmación de pedido");
  }, [order?.value?.code]);

  useEffect(() => {
    if (!id) {
      addToast("Error al obtener la orden", "error");
      navigate(-1);
      return;
    }
    getOrder?.mutate(id, {
      onSuccess: ({ data }) => {
        if (!data) {
          navigate(-1);
          // addToast("Error al obtener la orden", "error");
          return;
        }
        order.set(data);
      },
      onError: (error) => {
        // console.log(error);
        addToast("Error al obtener la orden", "error");
        navigate(-1);
        return;
      },
    });
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };
  if (!order?.value) return <></>;
  return (
    <Container sx={style.container}>
      <HelmetMeta page="orderConfirmation" />
      <Box className={"flex flex-col gap-4 flex-grow"}>
        <OrderDetailContainer order={order?.value} />
      </Box>
      <Box className={"sticky bottom-2 left-0 right-0 w-full"}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          fullWidth
        >
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
};

const style = {
  container: {
    height: "100%",
    backgroundColor: (t) => t?.palette?.neutral10?.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    minHeight: "calc(100vh - 70px)",
    flexGrow: 1,
  },
};

export default OrderTrackingPage;
