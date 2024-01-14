import Box from "@mui/material/Box";
import { useLocationState } from "#/stores/LocationState.js";
import { useEffect } from "react";
import { DELIVERY_METHODS } from "#/config/constants.js";
import DeliveryMethodSelection from "#/components/domain/delivery/DeliveryMethodSelection.jsx";
import PickupSelectionContainer from "#/components/domain/delivery/PickupSelectionContainer.jsx";
import MeetupSelectionContainer from "#/components/domain/delivery/MeetupSelectionContainer.jsx";
import DeliverySelectionContainer from "#/components/domain/delivery/DeliverySelectionContainer.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";

export default function ShippingContainer() {
  const location = useLocationState();
  useEffect(() => {
    if (location?.deliveryMethod === null) {
      location?.setDeliveryMethod(DELIVERY_METHODS[0]?.value);
    }
  }, []);

  const handleSelection = (value) => {
    if (value === null) return;
    location?.setDeliveryMethod(value);
  };

  return (
    <Box className="flex-1 w-full flex flex-col gap-4 items-start">
      <SemiBold14>
        Forma de entrega
      </SemiBold14>
      <DeliveryMethodSelection
        selected={location?.deliveryMethod}
        handleSelection={handleSelection}
      />
      {location?.deliveryMethod === 0 && <DeliverySelectionContainer />}
      {location?.deliveryMethod === 1 && <PickupSelectionContainer />}
      {location?.deliveryMethod === 2 && <MeetupSelectionContainer />}
    </Box>
  );
}
