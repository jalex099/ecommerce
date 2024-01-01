import Box from "@mui/material/Box";
import { useAuthState } from "#/stores/AuthState.js";
import AddressSelectionContainer from "#/components/domain/checkout/AddressSelectionContainer.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import MapContainer from "#/components/shared/MapContainer.jsx";
import GeolocationService from "#/services/GeolocationService.js";
import { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import serializeState from "#/utils/serializeState";

const DeliveryMethodSelection = () => {
  const auth = useAuthState();
  const location = useLocationState();
  const tempLocation = useHookstate(null);
  const addressSelected = useHookstate(null);
  const { getLatLong } = GeolocationService();
  useEffect(() => {
    if (location?.addressRegister) {
      addressSelected.set(serializeState(location?.addressRegister));
    }
    if (location?.lat && location?.lng) {
      tempLocation.set({ latitude: location?.lat, longitude: location?.lng });
      return;
    }
    fillLocation();
  }, []);

  const fillLocation = async () => {
    try {
      const coords = await getLatLong();
      tempLocation.set({
        latitude: coords?.lat,
        longitude: coords?.long,
      });
    } catch (error) {
      //   addToast("No se pudo obtener tu ubicación", "error");
      console.log(error);
    }
  };

  const handleLocationChange = ({ lngLat, address = null }) => {
    tempLocation.set({
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
    });
    if (address) {
      addressSelected.set(address);
    }
    //* Fill location state
    location?.fillFromDeliveryAddress({
      lat: lngLat?.lat,
      lng: lngLat?.lng,
      street: address?.street || null,
      houseNumber: address?.houseNumber || null,
      reference: address?.reference || null,
      addressRegister: address || null,
    });
  };

  return (
    <Box className="flex-1 w-full flex flex-col gap-6">
      {auth?.isAuthenticated && auth?.isVerified && (
        <AddressSelectionContainer
          handleSelection={handleLocationChange}
          selected={addressSelected?.get()}
        />
      )}
      {tempLocation?.value?.latitude && tempLocation?.value?.longitude && (
        <Box
          sx={{
            width: "100%",
            height: "300px",
          }}
        >
          <MapContainer
            latitude={tempLocation?.value?.latitude}
            longitude={tempLocation?.value?.longitude}
            handleLocationChange={handleLocationChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default DeliveryMethodSelection;
