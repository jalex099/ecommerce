import Box from "@mui/material/Box";
import { useLocationState } from "#/stores/LocationState.js";
import { useEffect } from "react";
import { DELIVERY_METHODS } from "#/config/constants";
import DeliveryMethodSelection from "#/components/domain/checkout/DeliveryMethodSelection";
import PickupSelectionContainer from "#/components/domain/checkout/PickupSelectionContainer";
import MeetupSelectionContainer from "#/components/domain/checkout/MeetupSelectionContainer";
import DeliverySelectionContainer from "#/components/domain/checkout/DeliverySelectionContainer";

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
