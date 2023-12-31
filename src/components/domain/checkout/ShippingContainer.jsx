import Box from "@mui/material/Box";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { useEffect } from "react";
import { DELIVERY_METHODS } from "#/config/constants";
import DeliveryMethodSelection from "#/components/domain/checkout/DeliveryMethodSelection";
import AddressSelectionContainer from "#/components/domain/checkout/AddressSelectionContainer";
import PickupSelectionContainer from "#/components/domain/checkout/PickupSelectionContainer";
import MeetupSelectionContainer from "#/components/domain/checkout/MeetupSelectionContainer";

export default function ShippingContainer() {
  const checkoutState = useCheckoutState();

  useEffect(() => {
    if (checkoutState?.deliveryMethod === null) {
      checkoutState?.setDeliveryMethod(DELIVERY_METHODS[0]?.value);
    }
  }, []);

  const handleSelection = (value) => {
    if (value === null) return;
    checkoutState?.setDeliveryMethod(value);
  };

  return (
    <Box className="flex-1 w-full flex flex-col gap-4 items-start">
      <DeliveryMethodSelection
        selected={checkoutState?.deliveryMethod}
        handleSelection={handleSelection}
      />
      {checkoutState?.deliveryMethod === 0 && <AddressSelectionContainer />}
      {checkoutState?.deliveryMethod === 1 && <PickupSelectionContainer />}
      {checkoutState?.deliveryMethod === 2 && <MeetupSelectionContainer />}
    </Box>
  );
}
