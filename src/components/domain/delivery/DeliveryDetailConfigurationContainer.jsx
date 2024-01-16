import Box from "@mui/material/Box";
import DeliverySelectionContainer
  from "#/components/domain/delivery/DeliverySelectionContainer.jsx";
import PickupSelectionContainer
  from "#/components/domain/delivery/PickupSelectionContainer.jsx";
import MeetupSelectionContainer
  from "#/components/domain/delivery/MeetupSelectionContainer.jsx";
import Button from "@mui/material/Button";
import ContinueButtonContainer
  from "#/components/domain/delivery/ContinueButtonContainer.jsx";

const DeliveryDetailConfigurationContainer = ({method}) => {

  return (
    <Box className={" h-full flex flex-col pb-4"}>
      {method === 0 && <DeliverySelectionContainer />}
      {method === 1 && <PickupSelectionContainer />}
      {method === 2 && <MeetupSelectionContainer />}

    </Box>
  )

}

export default DeliveryDetailConfigurationContainer