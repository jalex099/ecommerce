import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHookstate } from "@hookstate/core";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import AccordionDetails from "@mui/material/AccordionDetails";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import SemiBold20 from "#/components/shared/fonts/SemiBold20.jsx";
import { useMemo } from "react";
import { DELIVERY_METHODS } from "#/config/constants.js";
import DataService from "#/services/DataService.js";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { format } from "date-fns";

const OrderGeneralDetails = ({ order }) => {
  const { shops, meetups } = DataService();
  const expanded = useHookstate(null)

  const handleChange = (panel) => (event, newExpanded) => {
    expanded.set(newExpanded ? panel : false);
  }

  const deliveryMethod = useMemo(()=>{
    return DELIVERY_METHODS?.find(method => method?.value === order?.deliveryMethod)?.label
  }, [order?.deliveryMethod])

  const addressOnDelivery = useMemo(()=>{
    if(order?.deliveryMethod !== "DELIVERY") return null
    return order?.address || "No proporcionado"
  }, [order?.deliveryMethod, order?.address])

  const shopOnPickup = useMemo(()=>{
    if(order?.deliveryMethod !== "PICKUP") return null
    return shops?.find(shop => shop?._id === order?.shop)?.name || "No proporcionado"
  }, [order?.deliveryMethod, order?.shop])

  const meetupOnMeetup = useMemo(()=>{
    if(order?.deliveryMethod !== "MEETUP") return null
    return meetups?.find(meetup => meetup?._id === order?.meetup)?.name || "No proporcionado"
  }, [order?.deliveryMethod, order?.meetup])


  return (
    <>
      <Accordion expanded={expanded?.value === 0} onChange={handleChange(0)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="order-info"
          id="panel-order-info"
        >
          <Box className={"w-full flex flex-row gap-2"}>
            <SemiBold16  className={"flex-1"} >
              Info
            </SemiBold16>
            <Regular14 styles={{color: t=>t?.palette?.neutral40?.main}}>
              N&uacute;mero, correo, etc
            </Regular14>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={"w-full flex flex-col gap-2"}>
            <Box className={"flex flex-col justify-start w-full"}>
              <SemiBold14>
                C&oacute;digo de pedido:
              </SemiBold14>
              <Regular14>
                {order?.code}
              </Regular14>
            </Box>
            <Box className={"flex flex-col justify-start w-full"}>
              <SemiBold14>
                Nombre completo:
              </SemiBold14>
              <Regular14>
                {order?.name || "No proporcionado"}
              </Regular14>
            </Box>
            <Box className={"flex flex-col justify-start w-full"}>
              <SemiBold14>
                Correo electr&oacute;nico:
              </SemiBold14>
              <Regular14>
                {order?.email || "No proporcionado"}
              </Regular14>
            </Box>
            <Box className={"flex flex-col justify-start w-full"}>
              <SemiBold14>
                N&uacute;mero de tel&eacute;fono:
              </SemiBold14>
              <Regular14>
                {order?.phone || "No proporcionado"}
              </Regular14>
            </Box>
          </Box>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded?.value === 1} onChange={handleChange(1)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="delivery-info"
          id="panel-delivery-info"
        >
          <Box className={"w-full flex flex-row gap-2"}>
            <SemiBold16  className={"flex-1"} >
              Entrega
            </SemiBold16>
            <Regular14 styles={{color: t=>t?.palette?.neutral40?.main}}>
              Lugar y hora
            </Regular14>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={"w-full flex flex-col gap-2"}>
            <Box className={"flex flex-col justify-start w-full"}>
              <SemiBold14 className={" uppercase"}>
                {deliveryMethod}
              </SemiBold14>
              <Regular14>
                {
                  order?.deliveryMethod === "PICKUP" && shopOnPickup
                }
                {
                  order?.deliveryMethod === "MEETUP" && meetupOnMeetup
                }
                {
                  order?.deliveryMethod === "DELIVERY" && addressOnDelivery
                }
              </Regular14>
            </Box>
            <Box className={"flex flex-col justify-start w-full"}>
              <SemiBold14>
                Fecha de entrega:
              </SemiBold14>
              <Regular14>
                {format(new Date(order?.deliveryDate), "dd/MM/yyyy - HH:mm a")}
              </Regular14>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default OrderGeneralDetails;