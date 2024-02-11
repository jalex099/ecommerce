import Box from "@mui/material/Box";
import OrderStepper
  from "#/components/domain/orderConfirmation/OrderStepper.jsx";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import { ORDER_STEPS } from "#/config/constants.js";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { format } from "date-fns";
import OrderGeneralDetails
  from "#/components/domain/orderConfirmation/OrderGeneralDetails.jsx";
import Divider from "@mui/material/Divider";
import { useMemo } from "react";

const OrderDetailContainer = ({ order }) => {

  const activeStepIndex = useMemo(()=>{
    return ORDER_STEPS.findIndex(step => step?.value === order?.status)
  }, [order?.status])

  return (
    <>
      <Box className={"py-4 px-8 flex flex-col gap-4 rounded-2xl"} sx={style?.whiteContainer}>
        <OrderStepper activeStep={activeStepIndex}/>
        <Box className={"flex flex-col gap-2"}>
          <SemiBold18 className={"w-full"}>
            {ORDER_STEPS[activeStepIndex]?.msg}
          </SemiBold18>
          <Regular14 styles={{color: t => t?.palette?.neutral60?.main}}>
            Entrega estimada: {format(new Date(order?.deliveryDate), "dd/MM - HH:mm a")}
          </Regular14>
        </Box>
        <OrderGeneralDetails order={order}/>
      </Box>
      <Divider/>
    </>
  )
}

const style = {
  whiteContainer: {
    backgroundColor: t=> t?.palette?.neutral0?.main,
  }
}

export default OrderDetailContainer;