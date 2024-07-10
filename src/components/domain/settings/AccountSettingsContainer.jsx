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
  const accountData = useHookstate({phone: '', alias: '', paymentCountry: '', paymentRegion: '', paymentAddress:'', paymentCity: '', paymentPostalCode: '', invoiceName: '', invoiceNumber: ''});
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
    accountData?.paymentRegion?.set(regions?.find(country => country?.id === userDetail?.paymentCountry)?.regions?.find(region => region?.id === userDetail?.paymentRegion)?.name || '');
    accountData?.paymentAddress?.set(userDetail?.paymentAddress || '');
    accountData?.paymentCity?.set(userDetail?.paymentCity || '');
    accountData?.paymentPostalCode?.set(userDetail?.paymentPostalCode || '');
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

  const handleChangePaymentCity = (e) => {
    accountData.paymentCity.set(e.target.value);
  }

  const handleChangePaymentPostalCode = (e) => {
    accountData.paymentPostalCode.set(e.target.value);
  }


  const validData = useMemo(() => {
    return accountData?.phone?.value != ''
  }, [accountData.value]);

  const handleSave = async () => {
    const payload = {
      ...accountData?.value,
      phone: accountData?.phone?.value.replace(/\D/g, '')?.length > 3 ? accountData?.phone?.value : '',
      paymentRegion: regionsByCountry?.find(region => region?.name === accountData?.value?.paymentRegion)?.id || ''
    }
    await save.mutate(payload)
  }

  const regionsByCountry = useMemo(() => {
    if(accountData?.value?.paymentCountry === '') return [];
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
              autoComplete={"nickname"}
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
              Datos de facturaci&oacute;n
            </SemiBold14>

            <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>
              Agiliza tus compras completando el siguiente formulario
            </Regular12>
          </Box>
          <Box className={"w-full"}>
            <TextField
              label={"Dirección"}
              name={"payment-address"}
              variant={"standard"}
              autoComplete={"shipping address-line1"}
              sx={{ width: "100%" }}
              value={accountData?.value?.paymentAddress || ''}
              onChange={handleChangePaymentAddress}
              multiline
              maxRows={3}
            />
          </Box>
          <Box className={"w-full"}>
            <TextField
              label={"Ciudad"}
              name={"payment-city"}
              variant={"standard"}
              autoComplete={"shipping address-level2"}
              sx={{ width: "100%" }}
              value={accountData?.value?.paymentCity || ''}
              onChange={handleChangePaymentCity}
            />
          </Box>
          <Box className={"w-full grid grid-cols-2 gap-4"}>
            <FormControl variant={"standard"} sx={{mt: 2}}>
              <InputLabel id="payment-country-label">Pa&iacute;s</InputLabel>
              <Select
                label={"Pa&iacute;s"}
                name={"payment-country"}
                autoComplete={"shipping country"}
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
                autoComplete={"shipping address-level1"}
                sx={{ width: "100%" }}
                value={accountData?.value?.paymentRegion || ''}
                onChange={handleChangeRegion}
              >
                {
                  regionsByCountry.map(region => {
                    return <MenuItem key={region?.id} value={region?.name}
                    >{region?.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Box>
          <Box className={"w-full"}>
            <TextField
              label={"Código postal"}
              name={"payment-postal-code"}
              variant={"standard"}
              autoComplete={"shipping postal-code"}
              sx={{ width: "100%" }}
              value={accountData?.value?.paymentPostalCode || ''}
              onChange={handleChangePaymentPostalCode}
            />
          </Box>
        </Box>
        {/*<Box className={"w-full flex flex-col gap-2"}>*/}
        {/*  <SemiBold14>*/}
        {/*    Datos de facturaci&oacute;n*/}
        {/*  </SemiBold14>*/}
        {/*  <Box className={"w-full"}>*/}
        {/*    <TextField*/}
        {/*      label={"Nombre en factura"}*/}
        {/*      name={"invoiceName"}*/}
        {/*      variant={"standard"}*/}
        {/*      autoComplete={"billing name"}*/}
        {/*      sx={{ width: "100%" }}*/}
        {/*      value={accountData?.value?.invoiceName || ''}*/}
        {/*      onChange={handleChangeInvoiceName}*/}
        {/*    />*/}
        {/*    <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>Nombre que aparecer&aacute; en la factura</Regular12>*/}
        {/*  </Box>*/}
        {/*  <Box className={"w-full"}>*/}
        {/*    <TextField*/}
        {/*      label={"NIT"}*/}
        {/*      name={"invoiceNumber"}*/}
        {/*      variant={"standard"}*/}
        {/*      autoComplete={"billing tax-id"}*/}
        {/*      sx={{ width: "100%" }}*/}
        {/*      value={accountData?.value?.invoiceNumber || ''}*/}
        {/*      onChange={handleChangeInvoiceNumber}*/}
        {/*    />*/}
        {/*    <Regular12 styles={{color: theme => theme?.palette?.neutral40?.main}}>N&uacute;mero de identificaci&oacute;n tributaria</Regular12>*/}
        {/*  </Box>*/}
        {/*</Box>*/}

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
                autoComplete="tel"/>}
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