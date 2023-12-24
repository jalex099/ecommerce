import Regular16 from "#/components/shared/fonts/Regular16";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Regular18 from "#/components/shared/fonts/Regular18";

function ShippingAndReturnPolicy({ ...props }) {
  return (
    <Accordion {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-shipping-and-return-policy-content"
        id="panel-shipping-and-return-policy-header"
      >
        <Regular18>
          Pol&iacute;tica de env&iacute;o y devoluci&oacute;n
        </Regular18>
      </AccordionSummary>
      <AccordionDetails>
        <Regular16>
          El env&iacute;o se realiza a trav&eacute;s de TransExpress hasta la
          puerta de su casa con hasta 3 intentos de entrega, y tiene un costo de
          $4.00 para todos los municipios de El Salvador.
          <br />
          <br />
          El tiempo de entrega es de 3 d&iacute;as h&aacute;biles.
          <br />
          <br />
          El producto se puede devolver en un plazo de 5 d&iacute;as
          h&aacute;biles desde la recepci&oacute;n del mismo. El costo de
          env&iacute;o corre por cuenta del comprador.
        </Regular16>
      </AccordionDetails>
    </Accordion>
  );
}

export default ShippingAndReturnPolicy;
