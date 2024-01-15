import Box from "@mui/material/Box";
import MapContainer from "#/components/shared/MapContainer.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useMemo } from "react";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useLocationState } from "#/stores/LocationState.js";

const DeliverySelectionFromMapContainer = ({latitude, longitude, handleChange, handleRetry}) => {

  const location = useLocationState();

  const isValid =useMemo(()=>{
    return latitude && longitude
  }, [latitude, longitude])

  return (
    <Box className={"flex flex-col gap-4"}>
      {
        isValid && (
          <>

            <Box
              sx={{
                width: "100%",
                height: "300px",
              }}
            >
              {latitude && longitude && (
                <MapContainer
                  latitude={latitude}
                  longitude={longitude}
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
                name="street"
                variant="standard"
                autoComplete="street"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "100%" }}
                required
                value={location?.delivery?.street || ""}
                onChange={(e) => {
                  location?.setStreetOnDelivery(e.target.value);
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
                value={location?.delivery?.houseNumber || ""}
                onChange={(e) => {
                  location?.setHouseNumberOnDelivery(e.target.value);
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
          </>
        )
      }
      {

        !isValid && (
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