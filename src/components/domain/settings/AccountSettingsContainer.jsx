import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useRef } from "react";
import InputMask from "react-input-mask";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useHookstate } from "@hookstate/core";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const AccountSettingsContainer = () => {
  const accountData = useHookstate({phone: '', invoiceName: '', invoiceNumber: ''});

  const handleChangePhone = (e) => {
    accountData.phone.set(e.target.value);
  }

  const handleChangeInvoiceName = (e) => {
    accountData.invoiceName.set(e.target.value);
  }

  const handleChangeInvoiceNumber = (e) => {
    accountData.invoiceNumber.set(e.target.value);
  }

  const handleSave = () => {
    console.log(accountData.value);

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
        spacing={2}
      >
        <Regular14>
          Datos de contacto
        </Regular14>
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
        <Regular14>
          Datos de facturaci&oacute;n
        </Regular14>
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
      </Stack>
      <Button variant={"contained"} fullWidth onClick={handleSave}>Guardar cambios</Button>
    </Box>
  )
}

export default AccountSettingsContainer;