import Box from "@mui/material/Box";
import { useMemo } from "react";
import { PAYMENT_METHODS } from "#/config/constants.js";
import CashIcon from "#/components/shared/icons/CashIcon.jsx";
import CardIcon from "#/components/shared/icons/CardIcon.jsx";
import BankIcon from "#/components/shared/icons/BankIcon.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from "#/components/shared/icons/ArrowRightIcon.jsx";
import { useNavigate } from "react-router-dom";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import { useHookstate } from "@hookstate/core";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import PaymentMethodSelectorContainer from "#/components/domain/checkout/PaymentMethodSelectorContainer.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import CloseIcon from "#/components/shared/icons/CloseIcon.jsx";
import AES from "crypto-js/aes.js";
import { ENCRYPT_KEY } from "#/config/constants.js";

const PaymentDetailContainer = ({ paymentValue }) => {

  const navigate = useNavigate();
  const checkout = useCheckoutState();
  const isOpen = useHookstate(false);

  const payment = useMemo(()=>{
    return PAYMENT_METHODS?.find(({value}) => value === paymentValue) || null
  }, [paymentValue])

  const handleOpen = () => {
    isOpen.set(true);
  }

  const handleClose = () => {
    checkout?.encryptCardPayment();
    isOpen.set(false);
  }

  return (
    <Box className={"flex flex-col gap-4"}>
      <SemiBold16>
        M&eacute;todo de pago
      </SemiBold16>
      <Box className={"flex flex-row gap-4"} onClick={handleOpen}>
        <Box className={"flex flex-row gap-4 flex-grow"}>
          { payment?.value === 0 && (<CashIcon className={"w-6 "}/>) }
          { payment?.value === 1 && (<CardIcon className={"w-6 "}/>) }
          { payment?.value === 2 && (<BankIcon className={"w-6 "}/>) }
          { payment == null && (<CloseIcon className={"w-6 "}/>) }
         <Box
          className={"flex flex-col gap-0"}
         >
           <Regular16>
             {payment?.label || "No seleccionado"}
           </Regular16>
           {
             payment?.code === "CARD" && checkout?.cardNumber && checkout?.showedCardNumber && (
               <Regular12>
                 {checkout?.showedCardNumber}
               </Regular12>
             )
           }
         </Box>
        </Box>
        <ArrowRightIcon
          className={"h-4"}
          whileTap={{ scale: 0.9 }}
        />
      </Box>
      <Dialog onClose={handleClose} open={isOpen.get()}
        PaperProps={{ sx: style.dialog }}
      >
        <DialogTitle>
          <SemiBold14>
            Selecciona tu m&eacute;todo de pago
          </SemiBold14>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon className="w-6 h-6" />
        </IconButton>
        <DialogContent>
          <PaymentMethodSelectorContainer
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

const style = {
  button: {},
  dialog: {
    minHeight: "400px",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
};

export default PaymentDetailContainer;