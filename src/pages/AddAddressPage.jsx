import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import MapContainer from "#/components/shared/MapContainer.jsx";
import GeolocationService from "#/services/GeolocationService";
import { useHookstate } from "@hookstate/core";
import Button from "@mui/material/Button";
import ClientAddressService from "#/services/ClientAddressService";
import FormAddressContainer from "#/components/domain/profile/addAddress/FormAddressContainer";
import { addToast } from "#/stores/UIState.js";
import GeocodingService from "#/services/GeocodingService.js";

function AddAddressPage() {
  const ui = useUIState();
  const { getLatLong } = GeolocationService();
  const location = useHookstate(null);
  const addressStreet = useHookstate("");
  const { add } = ClientAddressService();
  const isFormAddressOpen = useHookstate(false);
  const { getReverseGeocoding } = GeocodingService();

  useEffect(() => {
    ui?.setTitle("Agregar dirección");
  }, []);

  useEffect(() => {
    fillLocation();
  }, []);

  const fillLocation = async () => {
    try {
      const coords = await getLatLong();
      location.set({
        latitude: coords?.lat,
        longitude: coords?.long,
      });
      getReverseGeocoding.mutate(location?.value, {
        onSuccess: ({data}) => {
          if(!data) return;
          addressStreet?.set(data?.results?.find((item) => item?.types?.includes("route"))?.formatted_address || "");
        },
        onError: (error) => {
          console.log(error)
        }
      });
    } catch (error) {
      addToast("No se pudo obtener tu ubicación", "error");
      console.log(error);
    }
  };

  const handleLocationChange = ({ lngLat }) => {
    location.set({
      latitude: lngLat?.lat,
      longitude: lngLat?.lng,
    });
    getReverseGeocoding.mutate(location?.value, {
      onSuccess: ({data}) => {
        if(!data) return;
        addressStreet?.set(data?.results?.find((item) => item?.types?.includes("route"))?.formatted_address || "");
      },
      onError: (error) => {
        console.log(error)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the values from the form
    const formData = new FormData(e?.target);
    const data = Object.fromEntries(formData.entries());
    // If some of the values is empty, return. Only the reference can be empty
    if(!validateEntries(data)) {
      addToast("Completa todos los campos", "error");
      return;
    }
    // Create the base address object
    const address = {
      latitude: data?.latitude,
      longitude: data?.longitude,
      street: data?.addressStreet,
      houseNumber: data?.addressHouseNumber,
      name: data?.addressName,
      reference: data?.addressReference || ""
    };
    await add.mutate(address);
  };

  const validateEntries = (data) => {
    if(
      !data?.addressStreet ||
      !data?.addressHouseNumber ||
      !data?.addressName ||
      !data?.latitude ||
      !data?.longitude
    ) return false;
    
    return true;
  }

  const handleToogleFormAddress = () => {
    isFormAddressOpen.set((prev) => !prev);
  };

  if (!location?.value) return <></>;
  return (
    <Container sx={style.container}>
      <HelmetMeta page="addAddress" />
      <MapContainer
        latitude={location?.value?.latitude}
        longitude={location?.value?.longitude}
        handleLocationChange={handleLocationChange}
      />

      <Button
        variant="outlined"
        color="primary"
        className="w-44 mx-auto"
        onClick={handleToogleFormAddress}
        sx={style.button}
      >
        Continuar
      </Button>
      <FormAddressContainer
        isOpen={isFormAddressOpen.value}
        latitude={location?.value?.latitude}
        longitude={location?.value?.longitude}
        addressStreet={addressStreet?.value}
        handleSubmit={handleSubmit}
        handleClose={handleToogleFormAddress}
      />
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
  button: {
    position: "absolute",
    bottom: "32px",
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
