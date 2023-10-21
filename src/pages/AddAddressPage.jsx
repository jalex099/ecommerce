import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState";
import MapContainer from "#/components/shared/MapContainer.jsx";
import Box from "@mui/material/Box";
import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import GeolocationService from "#/services/GeolocationService";
import { useHookstate } from "@hookstate/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FloatingGoBackButton from "#/components/shared/topbar/FloatingGoBackButton.jsx";
import ClientAddressService from "#/services/ClientAddressService";

function AddAddressPage() {
  const ui = useUIState();
  const { getLatLong } = GeolocationService();
  const location = useHookstate(null);
  const { add } = ClientAddressService();

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
        latitude: coords?.lat,
        longitude: coords?.long,
        name: prev?.name || "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = ({ lngLat }) => {
    location.set((prev) => ({
      ...prev,
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
    }));
  };

  const handleLocationNameChange = (e) => {
    location.set((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { latitude, longitude, name } = location.value;
    if (!latitude || !longitude || !name) return;
    await add.mutate(location?.value);
  };

  if (!location?.value) return <></>;
  return (
    <Container sx={style.container}>
      <HelmetMeta page="addAddress" />
      <FloatingGoBackButton />
      <MapContainer
        latitude={location?.value?.latitude}
        longitude={location?.value?.longitude}
        handleLocationChange={handleLocationChange}
      />

      <Box sx={style.popup}>
        <Box>
          <SemiBold12>Agregar dirección</SemiBold12>
        </Box>
        <Box
          component="form"
          sx={{ width: "100%" }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={2} className="flex items-center">
            <TextField
              label="Nombre"
              name="address-name"
              variant="standard"
              sx={{ width: "100%" }}
              value={location?.value?.name}
              onChange={handleLocationNameChange}
            />
            <Button
              variant="outlined"
              color="primary"
              className="w-44 mx-auto"
              type="submit"
            >
              Continuar
            </Button>
          </Stack>
        </Box>
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
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  currentLocationButton: {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "24px",
    },
  },
};

export default AddAddressPage;
