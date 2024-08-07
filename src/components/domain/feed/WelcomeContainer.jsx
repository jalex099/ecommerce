import { Box } from "@mui/material";
import Regular24 from "#/components/shared/fonts/Regular24";
import SemiBold24 from "#/components/shared/fonts/SemiBold24";
import Regular12 from "#/components/shared/fonts/Regular12";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from "#/config/constants";

const WelcomeContainer = ({ name, isLoading, isAuthenticated }) => {
  return (
    <motion.div
      initial={SLIDE_UP_ANIMATION.initial}
      animate={SLIDE_UP_ANIMATION.animate}
      transition={SLIDE_UP_ANIMATION.transition}
      exit={SLIDE_UP_ANIMATION.exit}
    >
      <Regular24
        styles={{
          color: (theme) => theme?.palette?.neutral90?.main,
        }}
      >
        &#161;Hola,{" "}
        {isAuthenticated && isLoading ? (
          "..."
        ) : (
          <SemiBold24
            component="span"
            styles={{
              color: (theme) => theme?.palette?.neutral100?.main,
            }}
          >
            {" "}
            {isAuthenticated && !!name ? name : "amigo"}
            &#33;
          </SemiBold24>
        )}
      </Regular24>
      <Regular12
        styles={{
          color: (theme) => theme?.palette?.neutral60?.main,
        }}
      >
        &#191;Qué te gustaría pedir hoy?
      </Regular12>
    </motion.div>
  );
};

export default WelcomeContainer;
