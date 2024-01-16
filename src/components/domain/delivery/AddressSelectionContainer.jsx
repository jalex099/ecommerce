
import AddressCard from "#/components/domain/delivery/AddressCard.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import ContinueButtonContainer
  from "#/components/domain/delivery/ContinueButtonContainer.jsx";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import { useLocationState } from "#/stores/LocationState.js";
import serializeState from "#/utils/serializeState.js";
import AddressSelectionContainerSkeleton from "#/components/domain/delivery/AddressSelectionContainerSkeleton.jsx";
import DeliveryExtraPaymentAdvise
  from "#/components/domain/delivery/DeliveryExtraPaymentAdvise.jsx";

const AddressSelectionContainer = ({ addresses, isLoading, selected, handleSelectFromMap }) => {
  const tempSelection = useHookstate(null);
  const location= useLocationState();

  useEffect(()=>{
      if(!selected) return
      tempSelection.set(serializeState(selected));
  }, [])

  const handleSelection = (address) => {
    tempSelection.set(address);
  }
  const handleContinue = () => {
    location?.fillFromDeliveryAddress(serializeState(tempSelection?.value));
    location?.nextStep();
  }
  if(isLoading) return (
    <AddressSelectionContainerSkeleton />
  )
  return (
    <Box className="flex flex-col gap-4 flex-1">
      <Regular16>Escoge una de tus direcciones para el envío de tus producto
      </Regular16>
      <Stack spacing={1}>
        {addresses?.length > 0 &&
          addresses?.map((address) => (
            <AddressCard
              key={address?._id}
              address={address}
              isSelected={address?._id === tempSelection?.value?._id}
              handleSelection={handleSelection}
            />
          ))}
      </Stack>
      <Regular14>
        O{" "}
        <Box
          component="span"
          sx={{ color: (theme) => theme?.palette?.primary?.main }}
          onClick={handleSelectFromMap}
        >
          selecciona una ubicación
        </Box>{" "}
        en el mapa
      </Regular14>

      <DeliveryExtraPaymentAdvise/>
      <ContinueButtonContainer onClick={handleContinue} isDisabled={tempSelection?.value === null} />
    </Box>
  );
};

export default AddressSelectionContainer;
