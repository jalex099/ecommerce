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


  const activeStepIndex = useMemo(()=>{
    return ORDER_STEPS.findIndex(step => step?.value === order?.value?.status)
  }, [order?.value?.status])


  const handleGoHome = () => {
    navigate("/");
  };
  if(!order?.value) return <></>
  return (
    <Container sx={style.container}>
      <HelmetMeta page="orderConfirmation" />
      <Box className={"flex flex-col gap-4 "}>
        {/*<Box className={"flex gap-0 flex-col p-4 rounded-2xl text-center shadow-md mb-4"} sx={{backgroundColor: t => t?.palette?.primary10?.main}}>*/}
        {/*  <SemiBold24>*/}
        {/*    ¡Gracias por tu compra!*/}
        {/*  </SemiBold24>*/}
        {/*  <Regular14>*/}
        {/*    Tu pedido ha sido confirmado.*/}
        {/*  </Regular14>*/}
        {/*</Box>*/}
        <Box className={"py-4 px-8 flex flex-col gap-4 rounded-2xl"} sx={style?.whiteContainer}>
          <OrderStepper activeStep={activeStepIndex}/>
          <Box className={"flex flex-col gap-0"}>
            <SemiBold18 className={"w-full"}>
              {ORDER_STEPS[activeStepIndex]?.msg}
            </SemiBold18>
            <Regular14 styles={{color: t => t?.palette?.neutral60?.main}}>
              Entrega estimada: {format(new Date(order?.value?.deliveryDate), "dd/MM - HH:mm a")}
            </Regular14>
          </Box>
          <OrderGeneralDetails order={order}/>
        </Box>
        <Box className={"flex flex-col gap-0 text-right"}>
            <SemiBold16>
              #{order?.value?._id}
            </SemiBold16>
          <Regular16>
            {
              format(new Date(order?.value?.date), "dd/MM")
            }
          </Regular16>
          <Regular16>
            {
              format(new Date(order?.value?.deliveryDate), "dd/MM")
            }
          </Regular16>
        </Box>
        <Divider/>
        <Box  className={"flex flex-col gap-4 "}>
          <SemiBold16>
            Datos del pedido
          </SemiBold16>
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
    backgroundColor: t=> t?.palette?.neutral10?.main
  },
  whiteContainer: {
    backgroundColor: t=> t?.palette?.neutral0?.main,
  }
};

export default OrderConfirmationPage;
