import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Regular12 from "#/components/shared/fonts/Regular12";

function ForgotPasswordForm({
                        emailRef,
                        handleSubmit
                      }) {
  return (
    <Box
      component="form"
      sx={{ width: "100%" }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="on"
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <TextField
          label="Correo electrónico"
          name="email"
          variant="standard"
          autoComplete="email"
          sx={{ width: "100%" }}
          inputRef={emailRef}
          autoFocus
        />

        <Regular12>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Al dar clic en "Continuar" recibirás un correo electrónico con un enlace para restablecer tu contraseña.
        </Regular12>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          type="submit"
        >
          Continuar
        </Button>
      </Stack>
    </Box>
  );
}

export default ForgotPasswordForm;
