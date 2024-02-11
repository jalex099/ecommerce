import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import SemiBold20 from "#/components/shared/fonts/SemiBold20";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useUIState } from "#/stores/UIState.js";
import OrderService from "#/services/OrderService.js";
import { useHookstate } from "@hookstate/core";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import SemiBold24 from "#/components/shared/fonts/SemiBold24.jsx";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import { format } from "date-fns";
import Divider from "@mui/material/Divider";
import OrderStepper
  from "#/components/domain/orderConfirmation/OrderStepper.jsx";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import { ORDER_STEPS } from "#/config/constants.js";
import OrderGeneralDetails
  from "#/components/domain/orderConfirmation/OrderGeneralDetails.jsx";
import OrderDetailContainer
  from "#/components/domain/ordersAndMessages/OrderDetailContainer.jsx";
const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const ui = useUIState();
  const { id } = useParams();
  const {getOrder} = OrderService();
  const order = useHookstate(null);

  useEffect(() => {
    ui?.setTitle("Confirmación de pedido");
  }, []);

  useEffect(() => {
    getOrder?.mutate(id, {
      onSuccess: ({ data }) => {
        order.set(data);
        if(!data) {
          alert("Error al obtener la orden")
          navigate("/", { replace: true });
        }
      },
      onError: (error) => {
        console.log(error)
        alert("Error al obtener la orden")
        navigate("/", { replace: true });
        return;
      }
    })
  }, []);



  const handleGoHome = () => {
    navigate("/");
  };
  if(!order?.value) return <></>
  return (
    <Container sx={style.container}>
      <HelmetMeta page="orderConfirmation" />
      <Box className={"flex flex-col gap-4 flex-grow"}>
        <OrderDetailContainer order={order?.value}/>
      </Box>
      <Box
        className={"sticky bottom-0 left-0 right-0 w-full"}>
        <Button variant="contained" color="primary" onClick={handleGoHome} fullWidth>
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
};

const style = {
  container: {
    height: "100%",
    backgroundColor: t=> t?.palette?.neutral10?.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    minHeight: "calc(100dvh - 70px)",
    flexGrow: 1,
  },
};

export default OrderConfirmationPage;
