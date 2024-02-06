import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHookstate } from "@hookstate/core";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import AccordionDetails from "@mui/material/AccordionDetails";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Box from "@mui/material/Box";

const OrderGeneralDetails = ({ order }) => {
  const expanded = useHookstate(null)

  const handleChange = (panel) => (event, newExpanded) => {
    expanded.set(newExpanded ? panel : false);
  }

  return (
    <>
      <Accordion expanded={expanded?.value === 0} onChange={handleChange(0)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="order-info"
          id="panel-order-info"
        >
          <Box className={"w-full flex flex-row gap-2"}>
            <SemiBold14  className={"flex-1"} >
              Info
            </SemiBold14>
            <Regular14 styles={{color: t=>t?.palette?.neutral40?.main}}>
              N&uacute;mero, correo, etc
            </Regular14>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Regular14>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Regular14>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded?.value === 1} onChange={handleChange(1)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="delivery-info"
          id="panel-delivery-info"
        >
          <Box className={"w-full flex flex-row gap-2"}>
            <SemiBold14  className={"flex-1"} >
              Entrega
            </SemiBold14>
            <Regular14 styles={{color: t=>t?.palette?.neutral40?.main}}>
              Lugar y hora
            </Regular14>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Regular14>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Regular14>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default OrderGeneralDetails;