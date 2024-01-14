import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import Button from "@mui/material/Button";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import DataService from "#/services/DataService.js";

const DeliveryInfoContainer = () => {
  const location = useLocationState()
  const {shops, meetups } = DataService()
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/delivery')
  }

  const shop = useMemo(()=>{
      if(location?.shop === null) return null;
      return shops?.find(shop => shop?._id === location?.shop)
  }, [location?.shop])

  const meetingPoint = useMemo(()=>{
      if(location?.meetup === null) return null;
      return meetups?.find(meetup => meetup?._id === location?.meetup)
  }, [location?.meetup])


    return (
      <Box className="w-full rounded-md gap-2 flex flex-col">
        <SemiBold16>
          M&eacute;todo de entrega
        </SemiBold16>
        <Box className={"flex flex-row gap-2 justify-between"}>
          <Box className={"flex flex-col gap-1 flex-1"}>
            <Regular12>
              {location?.deliveryMethod === 0 ? "Envío a domicilio" : location?.deliveryMethod === 1 ? "Recoger en tienda" : "Punto de encuentro"}
            </Regular12>
            <SemiBold14>
              {
                location?.deliveryMethod === 0 && `${location?.street} #${location?.houseNumber}`
              }
              {
                location?.deliveryMethod === 1 && `${shop?.name} - ${shop?.city}`
              }
              {
                location?.deliveryMethod === 2 && `${meetingPoint?.name} - ${meetingPoint?.city}`
              }
            </SemiBold14>
          </Box>
          <Button variant="text" size="small" color={"primary"} onClick={handleClick}>
            <SemiBold14>Cambiar</SemiBold14>
          </Button>
        </Box>

      </Box>
    )
}

export default DeliveryInfoContainer;