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
          El env&iacute;o se realiza a trav&eacute;s de Correo Argentino, con un
          costo de $400 para CABA y GBA, y $500 para el resto del pa&iacute;s.
          <br />
          <br />
          El tiempo de entrega es de 7 d&iacute;as h&aacute;biles.
          <br />
          <br />
          El producto se puede devolver en un plazo de 10 d&iacute;as
          h&aacute;biles desde la recepci&oacute;n del mismo. El costo de
          env&iacute;o corre por cuenta del comprador.
        </Regular16>
      </AccordionDetails>
    </Accordion>
  );
}

export default ShippingAndReturnPolicy;
