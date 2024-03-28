import Box from "@mui/material/Box";
import { PAYMENT_METHODS } from "#/config/constants.js";
import PaymentMethodCard
  from "#/components/domain/checkout/PaymentMethodCard.jsx";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import DataService from "#/services/DataService.js";
import { motion } from "framer-motion";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import useLongPress from "#/hooks/useLongPress.jsx";
import BankAccount from "#/components/domain/checkout/payment/BankAccount.jsx";

const PaymentMethodSelectorContainer = ()=>{
  const checkoutState = useCheckoutState();
  const { parameters } = DataService();

  const handleChange = (paymentMethod) => {
    checkoutState?.setPaymentMethod(paymentMethod);
  }
  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <SemiBold16>
        M&eacute;todo de pago
      </SemiBold16>
      <HorizontalScroller separate showScrollbar>
        {
          PAYMENT_METHODS?.map((paymentMethod)=>(
            <PaymentMethodCard
              key={paymentMethod?.value}
              paymentMethod={paymentMethod}
              handleChange={handleChange}
              isSelected={checkoutState?.paymentMethod === paymentMethod?.value}
            />
          ))
        }
      </HorizontalScroller>
      {
        checkoutState?.paymentMethod === PAYMENT_METHODS?.find(({code}) => code === "TRANSFER")?.value && (
          <motion.div
            className={"w-full flex flex-col gap-2 justify-center my-4"}
            initial={{ translateY: -20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -20, opacity: 0 }}
          >
            <SemiBold14 className={"text-center"}>
              Cuentas disponibles para transferencia
            </SemiBold14>
            {
              parameters?.filter(({name}) => name === "BANK_ACCOUNT_NUMBER")?.map((parameter, index) => (
                <BankAccount  key={parameter?._id} bankAccount={parameter}/>
              ))
            }
            <Regular12 styles={{color: theme => theme?.palette?.opacity40?.main}}>
              Mantenga presionado el n&uacute;mero de cuenta para copiarlo
            </Regular12>
          </motion.div>
        )
      }
      <Regular12 className={"opacity-60"}>
        * Pago en efectivo se realiza contra entrega <br/>
        * Pago con transferencia bancaria se realiza la confirmaci&oacute;n en un plazo m&aacute;ximo de 24 horas
      </Regular12>
    </Box>
  )
}

export default PaymentMethodSelectorContainer;