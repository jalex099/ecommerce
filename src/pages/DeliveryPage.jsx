import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
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
      {
        location?.step === 0 && <DeliveryMethodSelectionContainer
          prevSelected={location?.selected}
          handleEvent={handleSelectMethod}
        />
      }
      {
        location?.step === 1 && <DeliveryDetailConfigurationContainer
          method={methodSelected?.value}
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