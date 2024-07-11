import { useLocationState } from "#/stores/LocationState.js";
import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from "#/config/constants.js";

const DateAndTimeInfoContainer = () =>{
  const navigate = useNavigate();
  const location = useLocationState();

  const handleClick = () => {
    navigate('/fecha-y-hora')
  }

  const dateAndTime = useMemo(()=>{
    if(location?.dateTime === null) return null;
    return location?.formatedDateTime();
  }, [location?.dateTime])

    return(
        <motion.div className="w-full rounded-md gap-2 flex flex-col"
                    initial={SLIDE_UP_ANIMATION.initial}
                    animate={SLIDE_UP_ANIMATION.animate}
                    transition={SLIDE_UP_ANIMATION.transition}
                    exit={SLIDE_UP_ANIMATION.exit}>
          <SemiBold16>
            Fecha y hora
          </SemiBold16>
          <Box className={"flex flex-row gap-2 justify-between items-center"}>
            <Regular12>
              {dateAndTime !== null ? dateAndTime : "Sin fecha y hora seleccionada"}
            </Regular12>
            <Button variant="text" size="small" color={"primary"} onClick={handleClick}>
              <SemiBold14>Cambiar</SemiBold14>
            </Button>
          </Box>
        </motion.div>
    )
}

export default DateAndTimeInfoContainer;