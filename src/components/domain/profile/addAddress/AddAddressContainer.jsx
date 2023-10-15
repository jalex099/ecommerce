import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState";
import MapContainer from "#/components/shared/MapContainer.jsx";

function AddAddressContainer() {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Agregar dirección");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MapContainer />
      <Box sx={style.container} component="form" onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <FormControl>
            <FormLabel>Calle</FormLabel>
            <Input name="street" />
          </FormControl>
          <FormControl>
            <FormLabel>Número</FormLabel>
            <Input name="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Localidad</FormLabel>
            <Input name="locality" />
          </FormControl>
          <FormControl>
            <FormLabel>Provincia</FormLabel>
            <Input name="province" />
          </FormControl>
          <FormControl>
            <FormLabel>Código postal</FormLabel>
            <Input name="postalCode" />
          </FormControl>
          <FormControl>
            <FormLabel>País</FormLabel>
            <Input name="country" />
          </FormControl>
          <FormControl>
            <FormLabel>Referencia</FormLabel>
            <Input name="reference" />
          </FormControl>
          <FormControl>
            <FormLabel>Alias</FormLabel>
            <Input name="alias" />
          </FormControl>
          <Button variant="outlined" type="submit">
            Agregar
          </Button>
        </Stack>
      </Box>
    </>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    width: "100%",
  },
};

export default AddAddressContainer;
