import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useMemo, useRef } from "react";
import InputMask from "react-input-mask";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useHookstate } from "@hookstate/core";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, Select } from "@mui/material";
// import file json with countries
import countriesJson from "#/assets/files/countries.json";
import ClientUserDetailService from "#/services/ClientUserDetailService.js";
import DataService from "#/services/DataService.js";

const AccountSettingsContainer = () => {
  const accountData = useHookstate({phone: '', alias: '', paymentCountry: '', paymentRegion: '', paymentAddress:'', invoiceName: '', invoiceNumber: ''});
  const phoneAreaCode =useHookstate(null);
  const {userDetail, save} = ClientUserDetailService();
  const { countries, regions } = DataService();

  useEffect(() => {
    if(!userDetail) return;
    accountData?.phone?.set(userDetail?.phone || '');
    accountData?.alias?.set(userDetail?.alias || '');
    accountData?.paymentCountry?.set(userDetail?.paymentCountry || '');
    accountData?.invoiceName?.set(userDetail?.invoiceName || '');
    accountData?.invoiceNumber?.set(userDetail?.invoiceNumber || '');
    accountData?.paymentRegion?.set(userDetail?.paymentRegion || '');
    accountData?.paymentAddress?.set(userDetail?.paymentAddress || '');
  }, [userDetail]);

  useEffect(() => {
    // Remover del telefono los simbolos
    if(accountData?.phone?.value !== '') {
      const phone = accountData?.phone?.value.replace(/\D/g, '');
      if(phone?.length > 3) return
    }
    if(phoneAreaCode?.value === null) return;
    const paddedPhoneAreaCode = String(phoneAreaCode.value).padStart(3, '0');
    accountData?.phone?.set(`(${paddedPhoneAreaCode}) `);
  }, [phoneAreaCode?.value]);

  const handleChangePhone = (e) => {
    accountData.phone.set(e.target.value);
  }

  const handleChangeInvoiceName = (e) => {
    accountData.invoiceName.set(e.target.value);
  }

  const handleChangeInvoiceNumber = (e) => {
    accountData.invoiceNumber.set(e.target.value);
  }

  const handleChangeAlias = (e) => {
    accountData.alias.set(e.target.value);
  }

  const handleChangeCountry = (e) => {
    accountData.paymentCountry.set('');
    accountData.paymentCountry.set(e.target.value);
    const codeArea = countriesJson?.find(country => country.iso2 === e.target.value)?.phone_code;
    phoneAreaCode.set(codeArea || null);
  }

  const handleChangeRegion = (e) => {
    accountData.paymentRegion.set(e.target.value);
  }

  const handleChangePaymentAddress = (e) => {
    accountData.paymentAddress.set(e.target.value);
  }


  const validData = useMemo(() => {
    return accountData?.phone?.value != ''
  }, [accountData.value]);

  const handleSave = async () => {
    await save.mutate(accountData?.value)
  }

  const regionsByCountry = useMemo(() => {
    return regions?.find((region) => region?.id === accountData?.value?.paymentCountry)?.regions || [];
  }, [accountData.value?.paymentCountry, regions]);

  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <SemiBold16>
        Informaci&oacute;n personal
      </SemiBold16>
      <Regular16>
        Esta es la secci&oacute;n de configuraci&oacute;n de informaci&oacute;n general de tu cuenta. Son utilizados para
        completar tus pedidos de una forma m&aacute;s r&aacute;pida y sencilla.
      </Regular16>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <Box className={"w-full flex flex-col gap-2"}>
          <SemiBold14>
            Datos generales
          </SemiBold14>
          <Box className={"flex flex-col gap-0 w-full"}>
            <TextField
              label={"Alias"}
              name={"alias"}
              variant={"standard"}
              autoComplete={"alias"}
              sx={{ width: "100%" }}
              value={accountData?.value?.alias || ''}
              onChange={handleChangeAlias}
            />
            <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>Forma en la que quieres que se te llame en la plataforma</Regular12>
          </Box>
        </Box>
        <Box className={"w-full flex flex-col gap-2"}>
          <Box className={"w-full flex flex-col gap-0 "}>
            <SemiBold14>
              Datos para pago en l&iacute;nea
            </SemiBold14>

            <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>
              Agiliza tus compras en l&iacute;nea completando los siguientes datos
            </Regular12>
          </Box>
          <Box className={"w-full"}>
            <TextField
              label={"Dirección"}
              name={"payment-address"}
              variant={"standard"}
              autoComplete={"paymentAddress"}
              sx={{ width: "100%" }}
              value={accountData?.value?.paymentAddress || ''}
              onChange={handleChangePaymentAddress}
              multiline
              maxRows={3}
            />
          </Box>
          <Box className={"w-full grid grid-cols-2 gap-4"}>
            <FormControl variant={"standard"} sx={{mt: 2}}>
              <InputLabel id="payment-country-label">Pa&iacute;s</InputLabel>
              <Select
                label={"Pa&iacute;s"}
                name={"payment-country"}
                autoComplete={"off"}
                sx={{ width: "100%" }}
                value={accountData?.value?.paymentCountry || ''}
                onChange={handleChangeCountry}
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
                autoComplete={"off"}
                sx={{ width: "100%" }}
                value={accountData?.value?.paymentRegion || ''}
                onChange={handleChangeRegion}
              >
                {
                  regionsByCountry.map(region => {
                    return <MenuItem key={region?.id} value={region?.id}
                    >{region?.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className={"w-full flex flex-col gap-2"}>
          <SemiBold14>
            Datos de facturaci&oacute;n
          </SemiBold14>
          <Box className={"w-full"}>
            <TextField
              label={"Nombre en factura"}
              name={"invoiceName"}
              variant={"standard"}
              autoComplete={"invoiceName"}
              sx={{ width: "100%" }}
              value={accountData?.value?.invoiceName || ''}
              onChange={handleChangeInvoiceName}
            />
            <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>Nombre que aparecer&aacute; en la factura</Regular12>
          </Box>
          <Box className={"w-full"}>
            <TextField
              label={"NIT"}
              name={"invoiceNumber"}
              variant={"standard"}
              autoComplete={"invoiceNumber"}
              sx={{ width: "100%" }}
              value={accountData?.value?.invoiceNumber || ''}
              onChange={handleChangeInvoiceNumber}
            />
            <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>N&uacute;mero de identificaci&oacute;n tributaria</Regular12>
          </Box>
        </Box>

        <Box className={"w-full flex flex-col gap-2"}>
          <SemiBold14>
            Datos de contacto
          </SemiBold14>
          <Box className={"flex flex-col gap-0 w-full"}>
            <InputMask
              mask="(999) 9999-9999"
              value={accountData?.value?.phone || ''}
              onChange={handleChangePhone}
              maskChar=" "
            >
              {() => <TextField
                label="Teléfono"
                name="phone"
                variant="standard" sx={{ width: "100%" }}
                required
                autoComplete="phone"/>}
            </InputMask>
            <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>Formato requerido: (XXX) XXXX-XXXX</Regular12>
          </Box>
        </Box>
      </Stack>
      <Button variant={"contained"} fullWidth onClick={handleSave}
              disabled={!validData}
      >Guardar cambios</Button>
    </Box>
  )
}

export default AccountSettingsContainer;