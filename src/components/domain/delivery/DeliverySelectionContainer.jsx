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
  const tempLocation = useHookstate(null);
  const selectFromMap = useHookstate(false);
  const { addresses, isLoading } = ClientAddressService();
  const errorOnGeolocation = useHookstate(false);
  const { getLatLong } = GeolocationService();
  useEffect(() => {
  }, []);

  useEffect(() => {
    if(!selectFromMap?.value){
      return;
    }
    tempLocation.set(null)
    fillLocation()
  }, [selectFromMap?.value]);

  useEffect(() => {
    if(isLoading) return
    if(addresses?.length === 0){
      selectFromMap?.set(true)
    }
  }, [addresses, isLoading]);

  const fillLocation = async () => {
    try {
      const coords = await getLatLong();
      tempLocation.set({
        latitude: coords?.lat,
        longitude: coords?.long,
      });
      // Fill location state
      location?.fillFromDeliveryAddress({ latitude: coords?.lat, longitude: coords?.long });
    } catch (error) {
      //   addToast("No se pudo obtener tu ubicación", "error");
      errorOnGeolocation.set(true);
      console.log(error);
    }
  };

  const handleLocationChange = (data) => {
    tempLocation.set({
      latitude: data?.latitude,
      longitude: data?.longitude
    });
    // Fill location state
    location?.fillFromDeliveryAddress(data);
  };
  const handleLocationChangeFromMap = ({ lngLat }) => {
    tempLocation.set({
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
    });
    // Fill location state
    location?.fillFromDeliveryAddress({
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
      street: "",
      houseNumber: "",
      reference: null,
      city: null,
      _id: null,
    });
  };

  const showAddressSelection = useMemo(() => {
    return auth?.isAuthenticated && auth?.isVerified && addresses?.length > 0;
  }, [auth]);

  return (
    <Box className="flex-1 w-full h-full flex flex-col gap-8">
      {showAddressSelection && !selectFromMap?.value && (
        <>
          <AddressSelectionContainer
            addresses={addresses}
            handleSelection={handleLocationChange}
            selected={location?.delivery?._id || null}
          />
          <Regular14>
            O{" "}
            <Box
              component="span"
              sx={{ color: (theme) => theme?.palette?.primary?.main }}
              onClick={() => { selectFromMap?.set(true)}}
            >
              selecciona una ubicación
            </Box>{" "}
            en el mapa
          </Regular14>
        </>
      )}
      {
        !!selectFromMap?.value && (
          <DeliverySelectionFromMapContainer
            latitude={tempLocation?.value?.latitude}
            longitude={tempLocation?.value?.longitude}
            handleChange={handleLocationChangeFromMap}
            handleRetry={fillLocation}
          />
        )
      }



    </Box>
  );
};

export default DeliveryMethodSelection;
