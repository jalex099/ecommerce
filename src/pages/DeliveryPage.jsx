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
import { useHookstate } from "@hookstate/core";
import DeliveryMethodSelectionContainer from "#/components/domain/delivery/DeliveryMethodSelectionContainer.jsx";
import DeliveryDetailConfigurationContainer from "#/components/domain/delivery/DeliveryDetailConfigurationContainer.jsx";

const DeliveryPage = ()=>{
  const location = useLocationState();
  const ui = useUIState();
  const methodSelected = useHookstate(null)
  useEffect(() => {
    ui?.setTitle("Método de entrega");
  }, []);
  useEffect(() => {
    if (location?.selected != null) {
      methodSelected?.set(location?.selected)
    }

  }, []);


  const handleSelectMethod = (item) => {
    methodSelected?.set(item)
    location?.nextStep()
  }


  return (
    <Container sx={style.container} >
      <HelmetMeta page="delivery" />
      {/*<DeliveryMethodSelection*/}
      {/*  selected={methodSelected?.value}*/}
      {/*  handleSelection={handleSelection}*/}
      {/*/>*/}
      {/*{methodSelected?.value === 0 && <DeliverySelectionContainer />}*/}
      {/*{methodSelected?.value === 1 && <PickupSelectionContainer />}*/}
      {/*{methodSelected?.value === 2 && <MeetupSelectionContainer />}*/}
      {/*<Box className={"flex flex-row gap-2 justify-between mt-4"}>*/}
      {/*  <Button*/}
      {/*    variant="contained"*/}
      {/*    size="small"*/}
      {/*    className={"w-full"}*/}
      {/*    color={"primary"}*/}
      {/*    onClick={() => ui?.setStep(CHECKOUT_STEPS[1]?.value)}*/}
      {/*  >*/}
      {/*    Continuar*/}
      {/*  </Button>*/}
      {/*</Box>*/}
      {
        location?.step === 0 && <DeliveryMethodSelectionContainer
          prevSelected={location?.selected}
          handleEvent={handleSelectMethod}
        />
      }
      {
        location?.step === 1 && <DeliveryDetailConfigurationContainer
          method={methodSelected?.value}
          isDisabledContinueButton={!location?.validateByMethod(methodSelected?.value)}
          handleContinue={() => location?.nextStep()}
        />
      }
    </Container>
  )
}

const style= {
  container: {
    height: '100%',
  }
}

export default DeliveryPage;