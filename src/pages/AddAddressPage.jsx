import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState";
import MapContainer from "#/components/shared/MapContainer.jsx";
import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import GeolocationService from "#/services/GeolocationService";
import { useHookstate } from "@hookstate/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function AddAddressPage() {
  const ui = useUIState();
  const { getLatLong } = GeolocationService();
  const location = useHookstate(null);

  useEffect(() => {
    ui?.setTitle("Agregar dirección");
  }, []);

  useEffect(() => {
    fillLocation();
  }, []);

  const fillLocation = async () => {
    try {
      const coords = await getLatLong();
      location.set((prev) => ({
        lat: coords?.lat,
        long: coords?.long,
        ...prev,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = ({ lngLat }) => {
    location.set((prev) => ({ lat: lngLat?.lat, long: lngLat?.lng, ...prev }));
  };

  const handleLocationNameChange = (e) => {
    location.set((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lat, long, name } = location.value;
    if (!lat || !long || !name) return;
    console.log("submit", location.value);
  };

  if (!location?.value) return <></>;
  return (
    <Container sx={style.container}>
      <HelmetMeta page="addAddress" />
      <MapContainer
        latitude={location?.value?.lat}
        longitude={location?.value?.long}
        handleLocationChange={handleLocationChange}
      />
      <Box sx={style.popup}>
        <SemiBold16>Ubicacion</SemiBold16>
        <Box
          component="form"
          sx={{ width: "100%" }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              name="address-name"
              variant="standard"
              sx={{ width: "100%" }}
              value={location?.value?.name}
              onChange={handleLocationNameChange}
            />
            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              Guardar
            </Button>
          </Stack>
        </Box>
        {/* <Regular12>
          {location?.value?.lat}, {location?.value?.long}
        </Regular12> */}
      </Box>
    </Container>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: 0,
    width: "100%",
    height: "calc(100vh - 70px)",
    position: "relative",
  },
  divider: {
    width: "100%",
  },
  popup: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
    right: "24px",
    minHeight: "100px",
    borderRadius: "24px",
    padding: "16px 32px",
    zIndex: "modal",
    backgroundColor: (theme) => theme.palette.neutral0.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
};

export default AddAddressPage;
