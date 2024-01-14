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
    // Fill location state
    location?.fillFromDeliveryAddress({
      lat: lngLat?.lat,
      lng: lngLat?.lng,
      street: address?.street || null,
      houseNumber: address?.houseNumber || null,
      reference: address?.reference || null,
      addressRegister: address || null,
    });
  };

  const handleLocationChangeFromMap = ({ lngLat }) => {
    // clear address selected
    addressSelected.set(null);
    tempLocation.set({
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
    });
    // Fill location state
    location?.fillFromDeliveryAddress({
      lat: lngLat?.lat,
      lng: lngLat?.lng,
      street: "",
      houseNumber: "",
      reference: null,
      addressRegister: null,
    });
  };

  const showAddressSelection = useMemo(() => {
    return auth?.isAuthenticated && auth?.isVerified;
  }, [auth]);

  const showMap = useMemo(() => {
    return tempLocation?.value?.latitude && tempLocation?.value?.longitude;
  }, [tempLocation]);

  return (
    <Box className="flex-1 w-full flex flex-col gap-8">
      {showAddressSelection && (
        <>
          <AddressSelectionContainer
            handleSelection={handleLocationChange}
            selected={addressSelected?.get()}
          />
          <Regular14>
            O{" "}
            <Box
              component="span"
              sx={{ color: (theme) => theme?.palette?.primary?.main }}
            >
              selecciona
            </Box>{" "}
            una ubicación en el mapa
          </Regular14>
        </>
      )}

      <Box
        sx={{
          width: "100%",
          height: showAddressSelection ? "150px" : "300px",
        }}
      >
        {showMap && (
          <MapContainer
            latitude={tempLocation?.value?.latitude}
            longitude={tempLocation?.value?.longitude}
            styles={{
              borderRadius: "8px",
            }}
            handleLocationChange={handleLocationChangeFromMap}
          />
        )}
        {!showMap && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ borderRadius: "8px" }}
          />
        )}
      </Box>

      <Stack spacing={2}>
        <TextField
          label="Calle o Avenida"
          name="street"
          variant="standard"
          autoComplete="street"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          required
          value={location?.street}
          onChange={(e) => {
            location?.setStreet(e.target.value);
          }}
        />
        <TextField
          label="Número de casa / piso"
          name="houseNumber"
          variant="standard"
          autoComplete="houseNumber"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          required
          value={location?.houseNumber}
          onChange={(e) => {
            location?.setHouseNumber(e.target.value);
          }}
        />
      </Stack>

      <Regular12
        styles={{
          color: (theme) => theme?.palette?.opacity40?.main,
        }}
      >
        * El env&iacute;o por delivery tiene un costo extra
      </Regular12>
    </Box>
  );
};

export default DeliveryMethodSelection;
