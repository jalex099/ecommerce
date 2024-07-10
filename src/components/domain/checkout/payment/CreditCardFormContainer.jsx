import {
  TextField,
  Box, FormControl, InputLabel, Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { usePaymentInputs } from 'react-payment-inputs';
import { useCheckoutState } from "#/stores/CheckoutState.js";
import CardFillView from "./CardFillView.jsx";
import Button from "@mui/material/Button";
import { useHookstate } from "@hookstate/core";
import MenuItem from "@mui/material/MenuItem";
import DataService from "#/services/DataService.js";
import { useEffect, useMemo } from "react";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { motion } from "framer-motion";
import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import IpInfoService from "#/services/IpInfoService.js";

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
  const isOpenExtraPaymentFields = useHookstate(false);
  const { countries, regions } = DataService();
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES
  });
  const { erroredInputs, touchedInputs } = meta;
  const { data } = IpInfoService();

  useEffect(() => {
    if(checkoutState?.paymentCountry && checkoutState?.paymentRegion && checkoutState?.paymentCity && checkoutState?.paymentAddress) return;
    if(!data) return;
    if(!checkoutState?.paymentCountry)
      checkoutState?.setPaymentCountry(data?.country_code);
    if(!checkoutState?.paymentRegion)
      checkoutState?.setPaymentRegion(data?.country_code + '-' + data?.region_code);
    if(!checkoutState?.paymentCity)
      checkoutState?.setPaymentCity(data?.city);
    if(!checkoutState?.paymentAddress)
      checkoutState?.setPaymentAddress(data?.city + ', ' + data?.country_name);
  }, [data]);

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

  const handleChangePaymentCountry = (e) => {
    checkoutState?.setPaymentCountry(e.target.value);
  }

  const handleChangePaymentRegion = (e) => {
    checkoutState?.setPaymentRegion(e.target.value);
  }

  const handleChangePaymentAddress = (e) => {
    checkoutState?.setPaymentAddress(e.target.value);
  }

  const handleChangePaymentCity = (e) => {
    checkoutState?.setPaymentCity(e.target.value);
  }

  const handleChangePaymentPostalCode = (e) => {
    checkoutState?.setPaymentPostalCode(e.target.value);
  }

  const regionsByCountry = useMemo(() => {
    return regions?.find((region) => region?.id === checkoutState?.paymentCountry)?.regions || [];
  }, [checkoutState?.paymentCountry, regions]);

  const handleAddCard = () => {
    checkoutState?.encryptCardPayment();
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
          error={!!(touchedInputs?.cardNumber && erroredInputs?.cardNumber)}
          helperText={touchedInputs?.cardNumber && erroredInputs?.cardNumber && meta?.error}
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
            error={!!(touchedInputs?.expiryDate && erroredInputs?.expiryDate)}
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
            error={!!(touchedInputs?.cvc && erroredInputs?.cvc)}
            helperText={touchedInputs?.cvc && erroredInputs?.cvc && meta?.error}
          />
        </Stack>
        </Stack>

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
      {
        !isOpenExtraPaymentFields?.value ? (
          <SemiBold12
            className={"text-right cursor-pointer"}
            onClick={() => isOpenExtraPaymentFields.set(true)}
          >
            Mostrar campos extras
          </SemiBold12>
        ) : (
          <motion.div
            className={"flex flex-col gap-2"}
            initial={{ translateY: -20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -20, opacity: 0 }}
          >
            <Stack spacing={2}>
              <TextField
                multiline
                fullWidth
                maxRows={3}
                variant="standard"
                type="text"
                label="Dirección"
                name={"payment-address"}
                autoComplete={"shipping address-line1"}
                value={checkoutState?.paymentAddress}
                onChange={handleChangePaymentAddress}
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Ciudad"
                name={"payment-city"}
                autoComplete={"shipping address-level2"}
                value={checkoutState?.paymentCity}
                onChange={handleChangePaymentCity}
              />
              <Box className={"w-full grid grid-cols-2 gap-4"}>
                <FormControl variant={"standard"} sx={{mt: 2}}>
                  <InputLabel id="payment-country-label">Pa&iacute;s</InputLabel>
                  <Select
                    label={"Pa&iacute;s"}
                    name={"payment-country"}
                    autoComplete={"shipping country"}
                    sx={{ width: "100%" }}
                    value={checkoutState?.paymentCountry || ''}
                    onChange={handleChangePaymentCountry}
                  >
                    {
                      countries?.map(country => {
                        return <MenuItem key={country?.id} value={country?.id}
                        >{country?.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl variant={"standard"} sx={{mt: 2}}>
                  <InputLabel id="payment-region-label">Regi&oacute;n</InputLabel>
                  <Select
                    label={"Regi&oacute;n"}
                    name={"payment-region"}
                    autoComplete={"shipping address-level1"}
                    sx={{ width: "100%" }}
                    value={checkoutState.paymentRegion || ''}
                    onChange={handleChangePaymentRegion}
                  >
                    {
                      regionsByCountry.map(region => {
                        return <MenuItem key={region?.id} value={region?.id}
                        >{region?.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Código postal"
                  name={"payment-postal-code"}
                  autoComplete={"shipping postal-code"}
                  value={checkoutState?.paymentPostalCode}
                  onChange={handleChangePaymentPostalCode}
                />
              </Box>
            </Stack>
          </motion.div>
        )
      }

      <Button
        variant={"outlined"}
        color={"primary"}
        onClick={handleAddCard}
        disabled={
          erroredInputs?.cardNumber ||
          erroredInputs?.expiryDate ||
          erroredInputs?.cvc ||
          !checkoutState?.cardHolderName ||
          !checkoutState?.paymentCountry ||
          !checkoutState?.paymentRegion ||
          !checkoutState?.paymentAddress ||
          !checkoutState?.paymentCity ||
          !checkoutState?.paymentPostalCode
      }
      >
        Agregar tarjeta
      </Button>
    </Box>
  );
};

export default CreditCardFormContainer;
