import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Radio from "@mui/material/Radio";
import Regular14 from "#/components/shared/fonts/Regular14";
import CashIcon from "#/components/shared/icons/CashIcon.jsx";
import CardIcon from "#/components/shared/icons/CardIcon.jsx";
import BankIcon from "#/components/shared/icons/BankIcon.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { motion } from "framer-motion";
import { PAYMENT_METHODS} from "#/config/constants.js";
import DataService from "#/services/DataService.js";
import BankAccount from "#/components/domain/checkout/payment/BankAccount.jsx";
import Button from "@mui/material/Button";
import CreditCardFormContainer from "#/components/domain/checkout/payment/CreditCardFormContainer.jsx";
import CreditCardFormWrapper from "./payment/CreditCardFormWrapper.jsx";

const PaymentMethodCard = ({ paymentMethod, isSelected, handleChange }) => {

  const { parameters } = DataService();

  return (
    <Accordion
      expanded={isSelected}
      onChange={()=>handleChange(paymentMethod?.value)}
      sx={{
        bgcolor: (theme) =>
          theme.palette.neutral0.main,
        padding: "0px",
      }}
      className={"rounded-xl"}
    >
      <AccordionSummary
      >
        <Box className="flex row items-center justify-around gap-2 py-2 px-4 rounded-md w-full cursor-pointer">
          { paymentMethod?.value === 0 && (<CashIcon className={"w-6 "}/>) }
          { paymentMethod?.value === 1 && (<CardIcon className={"w-6 "}/>) }
          { paymentMethod?.value === 2 && (<BankIcon className={"w-6 "}/>) }
          <Box className={"flex-1 flex justify-start items-center"}>
            <Regular14
              className={" text-center"}
            >{paymentMethod?.label}</Regular14>
          </Box>
          <Radio
            checked={isSelected}
            onChange={()=>handleChange(paymentMethod?.value)}
            value={paymentMethod?.value}
            name="payment-type"
            inputProps={{ "aria-label": "payment-type" }}
            size="small"
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {
          paymentMethod?.code === "CASH" && (
            <Regular12 className={"opacity-60"}>
              * Pago en efectivo se realiza contra entrega
            </Regular12>
          )
        }
        {
          paymentMethod?.code === "CARD" && (
            <motion.div
              className={"w-full flex flex-col gap-2 justify-center my-4"}
              initial={{ translateY: -20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: -20, opacity: 0 }}
            >
              <CreditCardFormWrapper>
                <CreditCardFormContainer />
              </CreditCardFormWrapper>
            </motion.div>
          )
        }
        {
          paymentMethod?.code === "TRANSFER" && (
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
              <Regular12 className={"text-center"} styles={{color: theme => theme?.palette?.opacity40?.main}}>
                Mantenga presionado el n&uacute;mero de cuenta para copiarlo
              </Regular12>
              <Regular12 className={"opacity-60 pt-6"}>
                * Pago con transferencia bancaria se realiza la confirmaci&oacute;n en un plazo m&aacute;ximo de 24 horas
              </Regular12>
            </motion.div>
          )
        }


      </AccordionDetails>
    </Accordion>
  )
}


export default PaymentMethodCard;