import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Regular12 from "#/components/shared/fonts/Regular12";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function RegisterForm({
  showPassword,
  showConfirmPassword,
  emailRef,
  passwordRef,
  confirmPasswordRef,
  handleSubmit,
  handleClickShowPassword,
  handleClickShowConfirmPassword,
  handleMouseDownPassword,
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
        />
        <TextField
          label="Contraseña"
          name="password"
          variant="standard"
          type={showPassword?.value ? "text" : "password"}
          sx={{ width: "100%" }}
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword?.value ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirmar contraseña"
          name="confirmPassword"
          variant="standard"
          type={showConfirmPassword?.value ? "text" : "password"}
          sx={{ width: "100%" }}
          inputRef={confirmPasswordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword?.value ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Regular12>
          Al dar click en Continuar, aceptas nuestros Términos y Política de
          privacidad.
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

export default RegisterForm;
