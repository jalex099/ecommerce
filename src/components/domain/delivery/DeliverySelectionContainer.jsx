import Box from "@mui/material/Box";
import { useAuthState } from "#/stores/AuthState.js";
import AddressSelectionContainer from "#/components/domain/delivery/AddressSelectionContainer.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import MapContainer from "#/components/shared/MapContainer.jsx";
import GeolocationService from "#/services/GeolocationService.js";
import { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import serializeState from "#/utils/serializeState.js";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { useMemo } from "react";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import ContinueButtonContainer from "#/components/domain/delivery/ContinueButtonContainer.jsx";
import ClientAddressService from "#/services/ClientAddressService.js";
import DeliverySelectionFromMapContainer
  from "#/components/domain/delivery/DeliverySelectionFromMapContainer.jsx";

const DeliveryMethodSelection = () => {
  const auth = useAuthState();
  const location = useLocationState();
  const selectFromMap = useHookstate(false);
  const { addresses, isLoading } = ClientAddressService();
  useEffect(() => {
  }, []);

  useEffect(() => {
    if(isLoading) return
    if(addresses?.length === 0){
      selectFromMap?.set(true)
    }
  }, [addresses, isLoading]);

  useEffect(()=>{
    if(!auth?.isVerified || !auth?.isAuthenticated || addresses?.length === 0){
      selectFromMap?.set(true);
    }
  }, [auth?.isVerified, auth?.isAuthenticated, isLoading])

  const showAddressSelection = useMemo(() => {
    return auth?.isAuthenticated && auth?.isVerified && addresses?.length > 0;
  }, [auth]);

  const handleSelectFromMap = () => {
    location?.clearState();
    selectFromMap.set(true);
  }


  return (
    <Box className="flex-1 w-full h-full flex flex-col gap-8">
      {showAddressSelection && !selectFromMap?.value && (
          <AddressSelectionContainer
            addresses={addresses}
            isLoading={isLoading}
            selected={location?.delivery}
            handleSelectFromMap={handleSelectFromMap}
          />
      )}
      {
        selectFromMap?.value && (
          <DeliverySelectionFromMapContainer
          />
        )
      }


    </Box>
  );
};

export default DeliveryMethodSelection;
