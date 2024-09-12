import Box from "@mui/material/Box";
import { PAYMENT_METHODS } from "#/config/constants.js";
import PaymentMethodCard from "#/components/domain/checkout/PaymentMethodCard.jsx";
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
import ClientUserDetailService from "#/services/ClientUserDetailService.js";
import Button from "@mui/material/Button";
import useValidateCheckout from "#/components/domain/checkout/controllers/useValidateCheckout.js";
import Accordion from "@mui/material/Accordion";

const PaymentMethodSelectorContainer = ({ handleClose }) => {
  const checkoutState = useCheckoutState();
  const { parameters } = DataService();
  const { userDetail } = ClientUserDetailService();
  const { validatePayment } = useValidateCheckout();

  const handleChange = (paymentMethod) => {
    checkoutState?.setPaymentMethod(paymentMethod);
  };

  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <Box className={"flex flex-col gap-2"}>
        {PAYMENT_METHODS?.map((paymentMethod) => (
          <PaymentMethodCard
            key={paymentMethod?.value}
            paymentMethod={paymentMethod}
            handleChange={handleChange}
            isSelected={checkoutState?.paymentMethod === paymentMethod?.value}
          />
        ))}
      </Box>
      <Button
        onClick={handleClose}
        variant="contained"
        color="primary"
        className={"w-full"}
        disabled={!validatePayment()}
      >
        <SemiBold14>Continuar</SemiBold14>
      </Button>
    </Box>
  );
};

export default PaymentMethodSelectorContainer;
