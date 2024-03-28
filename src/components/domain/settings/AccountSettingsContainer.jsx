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
import countries from "#/assets/files/countries.json";
import ClientUserDetailService from "#/services/ClientUserDetailService.js";

const AccountSettingsContainer = () => {
  const accountData = useHookstate({phone: '', alias: '', country: '', invoiceName: '', invoiceNumber: ''});
  const phoneAreaCode =useHookstate(null);
  const {userDetail, save} = ClientUserDetailService();

  useEffect(() => {
    if(!userDetail) return;
    accountData?.phone?.set(userDetail?.phone || '');
    accountData?.alias?.set(userDetail?.alias || '');
    accountData?.country?.set(userDetail?.country || '');
    accountData?.invoiceName?.set(userDetail?.invoiceName || '');
    accountData?.invoiceNumber?.set(userDetail?.invoiceNumber || '');
  }, [userDetail]);

  useEffect(() => {
    // Remover del telefono los simbolos
    if(accountData?.phone?.value !== '') {
      const phone = accountData?.phone?.value.replace(/\D/g, '');
      if(phone?.length > 3) return
    }
    accountData?.phone?.set(`(${phoneAreaCode?.value}) `);
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
    accountData.country.set(e.target.value);
    const codeArea = countries?.find(country => country.iso2 === e.target.value)?.phone_code;
    phoneAreaCode.set(codeArea || null);
  }


  const validData = useMemo(() => {
    return accountData?.phone?.value != ''
  }, [accountData.value]);

  const handleSave = async () => {
    await save.mutate(accountData?.value)
  }

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
            <FormControl variant={"standard"} sx={{mt: 2}}>
              <InputLabel id="country-label">Pa&iacute;s</InputLabel>
              <Select
                label={"Pa&iacute;s"}
                name={"country"}
                autoComplete={"off"}
                sx={{ width: "100%" }}
                value={accountData?.value?.country || ''}
                onChange={handleChangeCountry}
              >
                {
                  countries?.map(country => {
                    return <MenuItem key={country?.iso2} value={country?.iso2}
                    >{country?.nombre}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
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
      </Stack>
      <Button variant={"contained"} fullWidth onClick={handleSave}
              disabled={!validData}
      >Guardar cambios</Button>
    </Box>
  )
}

export default AccountSettingsContainer;