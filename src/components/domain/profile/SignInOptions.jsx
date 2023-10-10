import Box from "@mui/material/Box";
import AuthService from "#/services/AuthService";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import GoogleImage from "#/assets/images/google.png";

function SignInOptions() {
  const { loginWithGoogle, loginWithEmailAndPassword } = AuthService();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"), data.get("password"));
    loginWithEmailAndPassword(data.get("email"), data.get("password"));
  };

  return (
    <Box sx={style.container}>
      <form style={style.form} onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Correo electr&oacute;nico</FormLabel>
            <Input name="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Contrase&ntilde;a</FormLabel>
            <Input
              name="password"
              slotProps={{
                input: { type: "password" },
              }}
            />
          </FormControl>
          <Button variant="outlined" type="submit">
            Iniciar sesi&oacute;n
          </Button>
        </Stack>
      </form>
      <Button
        variant="outlined"
        onClick={loginWithGoogle}
        className="w-2/3"
        startIcon={<img src={GoogleImage} alt="Google" className="w-6" />}
      >
        Continuar con Google
      </Button>
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "180px",
    gap: "24px",
  },
  form: {
    width: "100%",
    padding: "32px",
  },
};

export default SignInOptions;
