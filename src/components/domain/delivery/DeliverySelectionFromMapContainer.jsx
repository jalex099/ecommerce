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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GeocodingService from "#/services/GeocodingService.js";

const DeliverySelectionFromMapContainer = () => {

  const location = useLocationState();
  const tempLocation = useHookstate(null);
  const isOpenDetailLocation = useHookstate(false);
  const errorOnGeolocation = useHookstate(false);
  const { getLatLong } = GeolocationService();
  const { getReverseGeocoding } = GeocodingService();

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
    isOpenDetailLocation?.set(true);
}

  const handleToogleFormAddress = async () => {
    const reverseGeoResponse = await getReverseGeocoding.mutateAsync(tempLocation?.value);
    if(reverseGeoResponse?.data)
      tempLocation.set((prev) => ({
        ...prev,
        street: reverseGeoResponse?.data?.results?.find((item) => item?.types?.includes("route"))?.formatted_address || "",
      }));
    isOpenDetailLocation?.set(true);
  };

const validForm  = useMemo(() => {
  return !(!tempLocation?.value?.longitude ||
    !tempLocation?.value?.latitude ||
    !tempLocation?.value?.street ||
    !tempLocation?.value?.houseNumber);

}, [tempLocation?.value])

  const handleCloseDetailDialog = () => {
    isOpenDetailLocation?.set(false);
  }

  const handleConfirm = ()=> {
    if(!validForm) return;
    location?.fillFromDeliveryAddress(serializeState(tempLocation?.value));
    location?.nextStep();
  }

  return (
    <Box className={"flex flex-col gap-4 flex-1"} sx={style?.container}>
      {
        !errorOnGeolocation?.value && (
          <>
              {tempLocation?.value?.longitude && tempLocation?.value?.latitude && (
                <MapContainer
                  latitude={tempLocation?.value?.latitude}
                  longitude={tempLocation?.value?.longitude}
                  handleLocationChange={handleChange}
                />
              )}
              <Button
                variant="outlined"
                color="primary"
                className="w-44 mx-auto"
                onClick={handleToogleFormAddress}
                sx={style.button}
              >
                Continuar
              </Button>
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
              sx={style.button}
            >
              Intentar de nuevo
            </Button>
          </Box>
        )
      }
      <Dialog
        open = {isOpenDetailLocation?.value}
        onClose = {handleCloseDetailDialog}
        PaperProps={{ sx: style.dialog }}
      >
        <DialogTitle>
          Detalles de la ubicación
        </DialogTitle>
        <DialogContent>
         <Box
          className={"pb-4"}
         >
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
         </Box>
          <Button
            onClick={handleConfirm}
            disabled={!validForm}
            fullWidth
            variant="contained"
            color="primary"
            >
            Confirmar
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

const style = {
  dialog: {
    // minHeight: "250px",
    width: "100%",
    padding: '24px',
    position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: 0,
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    position: "absolute",
    bottom: "32px",
  },
}
export default DeliverySelectionFromMapContainer;