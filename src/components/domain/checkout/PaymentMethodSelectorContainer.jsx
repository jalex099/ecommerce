import Box from "@mui/material/Box";
import { PAYMENT_METHODS } from "#/config/constants.js";
import PaymentMethodCard
  from "#/components/domain/checkout/PaymentMethodCard.jsx";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const PaymentMethodSelectorContainer = ()=>{
  const checkoutState = useCheckoutState();

  const handleChange = (paymentMethod) => {
    checkoutState?.setPaymentMethod(paymentMethod);
  }

  return (
    <Box className={"w-full flex flex-col gap-4"}>
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
      <Regular12>
        * Por el momento, tu pago se confirmar&aacute; por medio de una llamada
      </Regular12>
    </Box>
  )
}

export default PaymentMethodSelectorContainer;