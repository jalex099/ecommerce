import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import InputMask from "react-input-mask";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from "#/config/constants.js";

const GeneralInformationForm = ()=> {
  const checkoutState = useCheckoutState();

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
      <motion.div className={"w-full flex flex-col gap-4"}
                  initial={SLIDE_UP_ANIMATION.initial}
                  animate={SLIDE_UP_ANIMATION.animate}
                  transition={SLIDE_UP_ANIMATION.transition}
                  exit={SLIDE_UP_ANIMATION.exit}
      >
        <SemiBold16>Datos personales</SemiBold16>
        <Box className={"w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-4"}>
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
          <Box className={"flex flex-col gap-0 lg:max-w-[300px]"}>
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
        </Box>

        <Regular12 className={"opacity-60"}>
          * Campos obligatorios
        </Regular12>
      </motion.div>
    )
}

export default GeneralInformationForm;