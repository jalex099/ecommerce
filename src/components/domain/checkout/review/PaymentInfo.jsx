import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { PAYMENT_METHODS } from "#/config/constants.js";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const PaymentInfo = ({ paymentMethod }) => {
  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <SemiBold16>
        Informaci&oacute;n de pago
      </SemiBold16>
      <Box className={"flex flex-row gap-2 justify-between"}>
        <Box>
          <SemiBold14>
            M&eacute;todo de pago:
          </SemiBold14>
          <Regular14>
            {PAYMENT_METHODS?.find(({ value }) => value === paymentMethod)?.label}
          </Regular14>
        </Box>
      </Box>

      {
        paymentMethod === PAYMENT_METHODS?.find(({ code }) => code === "TRANSFER")?.value && (
          <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>
            * Al ser m&eacute;todo de pago "Transferencia bancaria", se har&aacute; la confirmaci&oacute;n de su pago en un plazo m&aacute;ximo de 24 horas.
          </Regular12>
        )
      }

    </Box>
  )
}

export default PaymentInfo;