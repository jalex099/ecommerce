import {
  TextField,
  Box,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { usePaymentInputs } from 'react-payment-inputs';
import { useCheckoutState } from "#/stores/CheckoutState.js";
import CardFillView from "./CardFillView.jsx";

const ERROR_MESSAGES = {
  emptyCardNumber: 'El número de la tarjeta es inválido',
  invalidCardNumber: 'El número de la tarjeta es inválido',
  emptyExpiryDate: 'La fecha de expiración es inválida',
  monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
  yearOutOfRange: 'El año de expiración no puede estar en el pasado',
  dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
  invalidExpiryDate: 'La fecha de expiración es inválida',
  emptyCVC: 'El código de seguridad es inválido',
  invalidCVC: 'El código de seguridad es inválido'
}

const CreditCardFormContainer = () => {
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES
  });

  const { erroredInputs, touchedInputs } = meta;

  const checkoutState = useCheckoutState();
  const handleChangeCardNumber = (e) => {
    checkoutState?.setCardNumber(e.target.value);
  }

  const handleChangeExpiryDate = (e) => {
    checkoutState?.setCardExpiration(e.target.value)
  }

  const handleChangeCVC = (e) => {
    checkoutState?.setCardCVC(e.target.value)
  }

  const handleChangeCardHolderName = (e) => {
    checkoutState?.setCardHolderName(e.target.value)
  }


  return (
    <Box className={"flex-1 w-full flex flex-col gap-4"}>
      <CardFillView
        cardNumber={checkoutState?.cardNumber}
        cardHolderName={checkoutState?.cardHolderName}
        cardExpiration={checkoutState?.cardExpiration}
        cardCVC={checkoutState?.cardCVC}
        cardType={meta?.cardType?.displayName}
      />
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Número de tarjeta"
          name="ccnumber"
          autoComplete="cc-number"
          variant="standard"
          inputProps={{
            ...getCardNumberProps({ onChange: handleChangeCardNumber, value: checkoutState?.cardNumber }),
          }}
          error={touchedInputs?.cardNumber && erroredInputs?.cardNumber}
          helperText={touchedInputs?.cardNumber && erroredInputs?.cardNumber && meta?.error}
        />
        <TextField
          fullWidth
          variant="standard"
          type="text"
          label="Nombre del titular"
          name={"ccname"}
          autoComplete="cc-name"
          value={checkoutState?.cardHolderName}
          onChange={handleChangeCardHolderName}
        />
        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            type="tel"
            label="Fecha de expiración"
            name={"ccexpiry"}
            autoComplete="cc-exp"
            inputProps={{
              ...getExpiryDateProps({ onChange: handleChangeExpiryDate, value: checkoutState?.cardExpiration }),
            }}
            variant="standard"
            error={touchedInputs?.expiryDate && erroredInputs?.expiryDate}
            helperText={touchedInputs?.expiryDate && erroredInputs?.expiryDate && meta?.error}
          />
          <TextField
            fullWidth
            type="tel"
            label="CVV"
            name={"cccvv"}
            variant={"standard"}
            autoComplete="cc-csc"
            inputProps={{
              ...getCVCProps({ onChange: handleChangeCVC, value: checkoutState?.cardCVC }),
            }}
            error={touchedInputs?.cvc && erroredInputs?.cvc}
            helperText={touchedInputs?.cvc && erroredInputs?.cvc && meta?.error}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreditCardFormContainer;
