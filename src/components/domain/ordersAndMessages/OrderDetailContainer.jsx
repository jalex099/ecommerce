import Box from "@mui/material/Box";
import OrderStepper
  from "#/components/domain/orderTracking/OrderStepper.jsx";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import { ORDER_STEPS, SUPPORT_WHATSAPP } from "#/config/constants.js";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { format } from "date-fns";
import OrderGeneralDetails
  from "#/components/domain/orderTracking/OrderGeneralDetails.jsx";
import Divider from "@mui/material/Divider";
import { useMemo } from "react";
import OrderProductsDetails
  from "#/components/domain/orderTracking/OrderProductsDetails.jsx";
import { formatCurrency } from "#/utils/currency.js";
import SemiBold20 from "#/components/shared/fonts/SemiBold20.jsx";
import { SUPPORT_EMAIL } from "#/config/constants.js";
import Link from "@mui/material/Link";
import ProblemIcon from "#/components/shared/icons/ProblemIcon.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import HavingTroublesContainer
  from "#/components/shared/HavingTroublesContainer.jsx";
import WhatsappIcon from "#/components/shared/icons/WhatsappIcon.jsx";
import GmailIcon from "#/components/shared/icons/GmailIcon.jsx";

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
            Entrega estimada: {format(new Date(order?.deliveryDate), "dd/MM - hh:mm a")}
          </Regular14>
        </Box>
        <OrderProductsDetails menu={order?.menu}/>
        <SemiBold20 className={'text-right'}>
          Total: {formatCurrency(order?.total || 0)}
        </SemiBold20>
        <OrderGeneralDetails order={order}/>
      </Box>
      <Divider/>
      <Box  className={"py-4 px-8 flex flex-col gap-4 rounded-2xl"} sx={style?.whiteContainer}>
        <SemiBold18 className={"w-full"}>
          ¿Dudas con tu pedido?
        </SemiBold18>
        <Regular14 styles={{color: t => t?.palette?.neutral60?.main}}>
          Cont&aacute;ctanos por cualquiera de los siguientes medios
        </Regular14>
        <Box className={"flex flex-row justify-around w-full gap-2"}>
          <Link href={`https://wa.me/${SUPPORT_WHATSAPP}`} color={"secondary"} target="_blank">
            <WhatsappIcon className={"w-8"}/>
          </Link>
          <Link href={`mailto:${SUPPORT_EMAIL}`} color={"secondary"} target="_blank">
            <GmailIcon className={"w-8"}/>
          </Link>
        </Box>
      </Box>
    </>
  )
}

const style = {
  whiteContainer: {
    backgroundColor: t=> t?.palette?.neutral0?.main,
  }
}

export default OrderDetailContainer;