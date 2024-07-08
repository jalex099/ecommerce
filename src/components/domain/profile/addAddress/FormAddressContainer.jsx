import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Regular12 from "#/components/shared/fonts/Regular12";

function FormAddressContainer({
  isOpen,
  longitude,
  latitude,
  addressStreet,
  handleSubmit,
  handleClose,
}) {
  return (
    <Dialog onClose={handleClose} open={isOpen} PaperProps={{ sx: style.dialog }}>
      <DialogTitle>
        <SemiBold14>Detalles extras</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Regular14>
          Agrega detalles extras para que el repartidor pueda ubicarte con
          facilidad.
        </Regular14>
        <Box
          component="form"
          sx={style.form}
          autoComplete="on"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2} justifyContent="flex-end">
            <input type="hidden" name="latitude" value={latitude} />
            <input type="hidden" name="longitude" value={longitude} />

            <TextField
              label="Calle o Avenida"
              name="addressStreet"
              variant="standard"
              autoComplete="address-street"
              sx={{ width: "100%" }}
              defaultValue={addressStreet}
              required
            />
            <TextField
              label="Número de casa / piso"
              name="addressHouseNumber"
              variant="standard"
              autoComplete="address-house-number"
              sx={{ width: "100%" }}
              required
            />

            <TextField
              label="Referencia o información adicional"
              name="addressReference"
              variant="standard"
              autoComplete="address-reference"
              sx={{ width: "100%" }}
              multiline
              minRows={1}
              maxRows={3}
            />
            <TextField
              label="Nombre para la dirección"
              name="addressName"
              variant="standard"
              autoComplete="addressName"
              sx={{ width: "100%" }}
              required
            />
            <Regular12
              styles={{
                color: (theme) => theme.palette.neutral40.main,
                textAlign: "right",
              }}
            >
              * Campos requeridos
            </Regular12>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%" }}
            >
              Agregar
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const style = {
  dialog: {
    minHeight: "300px",
    width: "100%",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  form: { mb: 2 },
};

export default FormAddressContainer;
