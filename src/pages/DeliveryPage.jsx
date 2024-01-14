import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import { CHECKOUT_STEPS, DELIVERY_METHODS } from "#/config/constants.js";
import Box from "@mui/material/Box";
import GeneralInformationForm
  from "#/components/domain/checkout/GeneralInformationForm.jsx";
import ShippingContainer
  from "#/components/domain/delivery/ShippingContainer.jsx";
import PaymentContainer
  from "#/components/domain/checkout/PaymentContainer.jsx";
import Button from "@mui/material/Button";
import DeliveryMethodSelection
  from "#/components/domain/delivery/DeliveryMethodSelection.jsx";
import DeliverySelectionContainer
  from "#/components/domain/delivery/DeliverySelectionContainer.jsx";
import PickupSelectionContainer
  from "#/components/domain/delivery/PickupSelectionContainer.jsx";
import MeetupSelectionContainer
  from "#/components/domain/delivery/MeetupSelectionContainer.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState.js";

const DeliveryPage = ()=>{
  const location = useLocationState();
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Método de entrega");
  }, []);
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
    <Container sx={style.container}>
      <HelmetMeta page="delivery" />
      <DeliveryMethodSelection
        selected={location?.deliveryMethod}
        handleSelection={handleSelection}
      />
      {location?.deliveryMethod === 0 && <DeliverySelectionContainer />}
      {location?.deliveryMethod === 1 && <PickupSelectionContainer />}
      {location?.deliveryMethod === 2 && <MeetupSelectionContainer />}
    </Container>
  )
}

const style= {
  container: {}
}

export default DeliveryPage;