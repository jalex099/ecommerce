import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import Button from "@mui/material/Button";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import DataService from "#/services/DataService.js";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from "#/config/constants.js";

const DeliveryInfoContainer = () => {
  const location = useLocationState()
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/metodo-de-entrega')
  }


    return (
      <motion.div className="w-full rounded-md gap-2 flex flex-col"
                  initial={SLIDE_UP_ANIMATION.initial}
                  animate={SLIDE_UP_ANIMATION.animate}
                  transition={SLIDE_UP_ANIMATION.transition}
                  exit={SLIDE_UP_ANIMATION.exit}
      >
        <SemiBold16>
          M&eacute;todo de entrega
        </SemiBold16>
        <Box className={"flex flex-row gap-2 justify-between"}>
          <Box className={"flex flex-col gap-1 flex-1"}>
            <Regular12>
              {location?.selected === 0 ? "Envío a domicilio" : location?.selected === 1 ? "Recoger en tienda" : location?.selected === 2 ? "Punto de encuentro" : "Sin método de entrega seleccionado"}
            </Regular12>
            <SemiBold14>
              {
                location?.selected === 0 && `${location?.delivery?.street} #${location?.delivery?.houseNumber}`
              }
              {
                location?.selected === 1 && `${location?.shop?.name} - ${location?.shop?.city}`
              }
              {
                location?.selected === 2 && `${location?.meetup?.name} - ${location?.meetup?.city}`
              }
            </SemiBold14>
          </Box>
          <Button variant="text" size="small" color={"primary"} onClick={handleClick}>
            <SemiBold14>Cambiar</SemiBold14>
          </Button>
        </Box>

      </motion.div>
    )
}

export default DeliveryInfoContainer;