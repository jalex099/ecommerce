import Box from "@mui/material/Box";
import MapContainer from "#/components/shared/MapContainer.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect, useMemo } from "react";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import { useHookstate } from "@hookstate/core";
import GeolocationService from "#/services/GeolocationService.js";
import ContinueButtonContainer
  from "#/components/domain/delivery/ContinueButtonContainer.jsx";
import serializeState from "#/utils/serializeState.js";
import DeliveryExtraPaymentAdvise
  from "#/components/domain/delivery/DeliveryExtraPaymentAdvise.jsx";

const DeliverySelectionFromMapContainer = () => {

  const location = useLocationState();
  const tempLocation = useHookstate(null);
  const errorOnGeolocation = useHookstate(false);
  const { getLatLong } = GeolocationService();

  useEffect(() => {
    //* Si ya tiene una dirección de delivery, la usa
    if(location?.delivery != null){
      tempLocation.set(serializeState(location?.delivery));
      return;
    }
    //* Si no tiene una dirección de delivery, intenta obtener la ubicación actual
    fillLocation()
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
      errorOnGeolocation.set(true);
      console.log(error);
    }
  };

  const handleChange = ({lngLat}) => {
    tempLocation.set({
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
    });
  }

  const handleRetry = () => {
    errorOnGeolocation.set(false);
    fillLocation();
  }

  const handleChangeStreet = (e) => {
    tempLocation.set((prev) => ({
      ...prev,
      street: e.target.value,
    }));
  }

  const handleChangeHouseNumber = (e) => {
    tempLocation.set((prev) => ({
      ...prev,
      houseNumber: e.target.value,
    }));
  }

  const handleChangeReference = (e) => {
    tempLocation.set((prev) => ({
      ...prev,
      reference: e.target.value,
    }));
  }

const handleContinue = () => {
    if(!validForm) return;
    location?.fillFromDeliveryAddress(serializeState(tempLocation?.value));
    location?.nextStep();
}

const validForm  = useMemo(() => {
  return !(!tempLocation?.value?.longitude ||
    !tempLocation?.value?.latitude ||
    !tempLocation?.value?.street ||
    !tempLocation?.value?.houseNumber);

}, [tempLocation?.value])

  return (
    <Box className={"flex flex-col gap-4 flex-1"}>
      {
        !errorOnGeolocation?.value && (
          <>
            <Box
              sx={{
                width: "100%",flex:1,  minHeight: "200px",
              }}
            >
              {tempLocation?.value?.longitude && tempLocation?.value?.latitude && (
                <MapContainer
                  latitude={tempLocation?.value?.latitude}
                  longitude={tempLocation?.value?.longitude}
                  styles={{
                    borderRadius: "8px",
                  }}
                  handleLocationChange={handleChange}
                />
              )}

            </Box>
            <Stack spacing={2}>
              <TextField
                label="Calle o Avenida"
                name="address-street"
                variant="standard"
                autoComplete="address-street"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "100%" }}
                required
                value={tempLocation?.value?.street || ""}
                onChange={handleChangeStreet}
              />
              <TextField
                label="Número de casa / piso"
                name="address-house-number"
                variant="standard"
                autoComplete="address-house-number"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "100%" }}
                required
                value={tempLocation?.value?.houseNumber || ""}
                onChange={handleChangeHouseNumber}
              />
              <TextField
                label="Referencia"
                name="address-reference"
                variant="standard"
                autoComplete="address-reference"
                InputLabelProps={{ shrink: true }}
                multiline
                minRows={1}
                maxRows={3}
                sx={{ width: "100%" }}
                value={tempLocation?.value?.reference || ""}
                onChange={handleChangeReference}
              />
            </Stack>
            <DeliveryExtraPaymentAdvise/>

            <ContinueButtonContainer onClick={handleContinue} isDisabled={!validForm}/>
          </>
        )
      }
      {
        errorOnGeolocation?.value && (
          <Box className={"flex flex-col h-full w-full justify-center items-center gap-4"}>
            <Regular14>
              No se pudo obtener tu ubicación
            </Regular14>
            <Button
              variant="outlined"
              color={"primary"}
              onClick={handleRetry}
            >
              Intentar de nuevo
            </Button>
          </Box>
        )
      }
    </Box>
  )
}

export default DeliverySelectionFromMapContainer;