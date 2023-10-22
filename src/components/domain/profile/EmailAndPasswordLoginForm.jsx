// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AuthService from "#/services/AuthService";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

function EmailAndPasswordLoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { loginWithEmailAndPassword } = AuthService();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) return;
    loginWithEmailAndPassword(email, password);
  };
  return (
    <form style={style.container} onSubmit={handleSubmit} autoComplete="true">
      <Stack spacing={2}>
        {/* <FormControl>
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
        </FormControl> */}
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
          type="password"
          sx={{ width: "100%" }}
          inputRef={passwordRef}
        />
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
