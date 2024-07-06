import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import { useEffect } from "react";
import { useAuthState } from "#/stores/AuthState.js";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import InputMask from "react-input-mask";
import ClientUserDetailService from "#/services/ClientUserDetailService.js";

const GeneralInformationForm = ()=> {
  const auth = useAuthState();
  const { userDetail} = ClientUserDetailService();
  const checkoutState = useCheckoutState();

  useEffect(() => {
    if(!checkoutState?.email || checkoutState?.email === ''){
      checkoutState?.setEmail(auth?.currentUser?.email);
    }
    if(!checkoutState?.completeName || checkoutState?.completeName === ''){
      checkoutState?.setCompleteName(auth?.currentUser?.displayName);
    }
  }, [auth?.currentUser?.email, auth?.currentUser?.displayName]);

  useEffect(() => {
    if(!userDetail) return;
    if(userDetail?.phone){
      checkoutState?.setPhone(userDetail?.phone);
    }
  }, [userDetail]);


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
           value={checkoutState?.completeName || ''}
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
          value={checkoutState?.email || ''}
          onChange={handleChangeEmail}
        />
        {/*<TextField*/}
        {/*  label="Teléfono"*/}
        {/*  // type={"number"}*/}
        {/*  name="phone"*/}
        {/*  variant="standard"*/}
        {/*  autoComplete="phone"*/}
        {/*  // InputLabelProps={{ shrink: true }}*/}
        {/*  sx={{ width: "100%" }}*/}
        {/*  required*/}
        {/*  value={checkoutState?.phone || ''}*/}
        {/*  onChange={handleChangePhone}*/}
        {/*/>*/}
       <Box className={"flex flex-col gap-0"}>
         <InputMask
           mask="(999) 9999-9999"
           value={checkoutState?.phone || ''}
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
        <TextField
          label="Instrucciones especiales (opcional)"
          name="special_instructions"
          variant="standard"
          autoComplete="special_instructions"
          // InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          value={checkoutState?.comments || ''}
          onChange={handleChangeComments}
          multiline
          minRows={1}
          maxRows={3}
        />
        <Regular12 className={"opacity-60"}>
          * Campos obligatorios
        </Regular12>
      </Box>
    )
}

export default GeneralInformationForm;