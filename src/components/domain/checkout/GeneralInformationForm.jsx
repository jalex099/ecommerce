import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import { useEffect } from "react";
import { useAuthState } from "#/stores/AuthState.js";

const GeneralInformationForm = ()=> {
  const auth = useAuthState();
  const checkoutState = useCheckoutState();

  useEffect(() => {
    if(checkoutState?.email === ''){
      checkoutState?.setEmail(auth?.currentUser?.email);
    }
    if(checkoutState?.completeName === ''){
      checkoutState?.setCompleteName(auth?.currentUser?.displayName);
    }
  }, [auth?.currentUser?.email, auth?.currentUser?.displayName]);


  const handleChangeCompleteName = (e) => {
    checkoutState?.setCompleteName(e.target.value)
  }


  const handleChangeEmail = (e) => {
    checkoutState?.setEmail(e.target.value);
  }

  const handleChangePhone = (e) => {
    checkoutState?.setPhone(e.target.value);
  }

  const handleChangeComments = (e) => {
    checkoutState?.setComments(e.target.value);
  }

    return (
      <Box className={"w-full flex flex-col gap-4"}>
        <SemiBold16>Datos personales</SemiBold16>
         <TextField
           label="Nombre completo"
           name="name"
           variant="standard"
           autoComplete="name"
           // InputLabelProps={{ shrink: true }}
           sx={{ width: "100%" }}
           required
           value={checkoutState?.completeName}
           onChange={handleChangeCompleteName}
         />
        <TextField
          label="Correo electrónico"
          name="email"
          variant="standard"
          autoComplete="email"
          // InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          required
          value={checkoutState?.email}
          onChange={handleChangeEmail}
        />
        <TextField
          label="Teléfono"
          name="phone"
          variant="standard"
          autoComplete="phone"
          // InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          required
          value={checkoutState?.phone}
          onChange={handleChangePhone}
        />
        <TextField
          label="Instrucciones especiales"
          name="special_instructions"
          variant="standard"
          autoComplete="special_instructions"
          // InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          value={checkoutState?.comments}
          onChange={handleChangeComments}
          multiline
          minRows={1}
          maxRows={3}
        />

      </Box>
    )
}

export default GeneralInformationForm;