import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { usePaymentInputs } from 'react-payment-inputs';
import { useHookstate } from "@hookstate/core";
import { useEffect } from 'react';
import { useFormContext, Controller } from "react-hook-form";

const CreditCardFormContainer = () => {
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;
  const {
    register,
    errors: formErrors,
    formState,
    triggerValidation,
    setValue
  } = useFormContext();

  const validation = (name, e) => {
    setValue(name, e.target.value, false);
    triggerValidation(name);
  };

  useEffect(() => {
    register(
      { name: "payment.cardnumber" },
      { required: "Enter a card number" }
    );
    register({ name: "payment.expiry" }, { required: "Enter an expiry date" });
    register({ name: "payment.ccv" }, { required: "Enter a CVC" });
    register(
      { name: "payment.accountHolderName" },
      { required: "Name required" }
    );
  }, [register]);

  return (
    <Box className={"w-full flex flex-col"} component={"form"}>
      <Stack spacing={2}>
        <TextField
          {...getCardNumberProps({
            refKey: "inputRef",
            onChange: validation.bind(null, "payment.cardnumber")
          })}
          inputRef={getCardNumberProps({ register }).ref}
          fullWidth
          type="tel"
          label="Credit card number"
          name="payment.cardnumber"
          variant="standard"
          error={
            (erroredInputs.cardNumber && touchedInputs.cardNumber) ||
            !!formErrors?.payment?.cardnumber?.message
          }
          helperText={
            (erroredInputs.cardNumber &&
              touchedInputs.cardNumber &&
              erroredInputs.cardNumber) ||
            formErrors?.payment?.cardnumber?.message
          }
          sx={{ input: { color: 'text.primary' } }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Name on Card"
          placeholder="Name on Card"
          name="payment.accountHolderName"
          inputRef={register}
          error={!!formErrors.payment?.accountHolderName?.message}
          helperText={formErrors.payment?.accountHolderName?.message}
          onChange={validation.bind(null, "payment.accountHolderName")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          sx={{ input: { color: 'text.primary' } }}
        />
        <Stack spacing={2} direction={"row"}>
          <TextField
            {...getExpiryDateProps({
              refKey: "inputRef",
              onChange: validation.bind(null, "payment.expiry")
            })}
            inputRef={getExpiryDateProps().ref}
            fullWidth
            type="tel"
            label="Expiry date"
            name="payment.expiry"
            variant="standard"
            error={
              (erroredInputs.expiryDate && touchedInputs.expiryDate) ||
              !!formErrors?.payment?.expiry?.message
            }
            helperText={
              (erroredInputs.expiryDate &&
                touchedInputs.expiryDate &&
                erroredInputs.expiryDate) ||
              formErrors?.payment?.expiry?.message
            }
            sx={{ input: { color: 'text.primary' } }}
          />
          <TextField
            {...getCVCProps({
              refKey: "inputRef",
              onChange: validation.bind(null, "payment.cvv"),
              onBlur: handleBlur
            })}
            inputRef={getCVCProps().ref}
            fullWidth
            type="tel"
            label="CVV"
            name="payment.cvv"
            variant="standard"
            error={
              (erroredInputs.cvc && touchedInputs.cvc) ||
              !!formErrors?.payment?.ccv?.message
            }
            helperText={
              (erroredInputs.cvc && touchedInputs.cvc && erroredInputs.cvc) ||
              formErrors?.payment?.ccv?.message
            }
            sx={{ input: { color: 'text.primary' } }}
          />
        </Stack>
      </Stack>
      {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
    </Box>
  )
}

export default CreditCardFormContainer;