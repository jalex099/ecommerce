import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AuthService from "#/services/AuthService";

function EmailAndPasswordLoginForm() {
  const { loginWithEmailAndPassword } = AuthService();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"), data.get("password"));
    loginWithEmailAndPassword(data.get("email"), data.get("password"));
  };
  return (
    <form style={style.container} onSubmit={handleSubmit}>
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
        <Button variant="contained" color="primary" type="submit">
          Iniciar sesi&oacute;n
        </Button>
      </Stack>
    </form>
  );
}

const style = {
  container: {
    width: "100%",
    marginTop: "24px",
  },
};

export default EmailAndPasswordLoginForm;
