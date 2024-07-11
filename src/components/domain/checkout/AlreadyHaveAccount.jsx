import { motion } from "framer-motion";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import { SLIDE_UP_ANIMATION } from "#/config/constants.js";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Button from "@mui/material/Button";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import LoginDialog from "#/components/domain/auth/LoginDialog.jsx";
import LoginIcon from "#/components/shared/icons/LoginIcon.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
const AlreadyHaveAccount = () => {
  return (
    <motion.div className={"w-full my-4 flex justify-center items-center"}
                initial={SLIDE_UP_ANIMATION.initial}
                animate={SLIDE_UP_ANIMATION.animate}
                transition={SLIDE_UP_ANIMATION.transition}
                exit={SLIDE_UP_ANIMATION.exit}
    >
      <Box
        className={"w-full flex justify-center items-center gap-6 rounded-xl p-4"}
        sx={{ bgcolor: theme => theme.palette.neutral5.main}}
      >
          <Box className={"text-center"}>
            <Regular14>
              ¿Ya tienes una cuenta?
            </Regular14>
            <Regular12
              styles={{ color: (theme) => theme.palette.neutral40.main, }}
            >
              Evita llenar tus datos de nuevo
            </Regular12>
          </Box>
          <LoginDialog />
      </Box>
    </motion.div>
  )
}

export default AlreadyHaveAccount;