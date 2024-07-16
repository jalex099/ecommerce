import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DeliverySelector from "#/components/domain/delivery/DeliverySelector.jsx";
import PickupSelector from "#/components/domain/delivery/PickupSelector.jsx";
import MeetupSelector from "#/components/domain/delivery/MeetupSelector.jsx";
import DataService from "#/services/DataService.js";
import { useMemo } from "react";

const DeliveryMethodSelectionContainer = ({prevSelected, handleEvent}) => {
  const { parameters } = DataService();

  const isEnabledDelivery = useMemo(()=>{
    return parameters?.find((item) => item?.name === "ENABLED_DELIVERY")?.value === "1"
  })

    return (
      <Box className="h-full flex flex-col gap-0 justify-around">
        {
          isEnabledDelivery && (
            <>
              <DeliverySelector handleEvent={handleEvent} isSelected={prevSelected === 0}/>
              <Divider className={"m-0"}/>
            </>
          )
        }

        <PickupSelector handleEvent={handleEvent} isSelected={prevSelected === 1}/>
          <Divider/>
        <MeetupSelector handleEvent={handleEvent}  isSelected={prevSelected === 2}/>
      </Box>
    )
}

export default DeliveryMethodSelectionContainer