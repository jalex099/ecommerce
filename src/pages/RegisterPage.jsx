import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import Box from "@mui/material/Box";
import { useUIState } from "#/hooks/UIState";
import { useEffect, useRef } from "react";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import Regular14 from "#/components/shared/fonts/Regular14";
import { useHookstate } from "@hookstate/core";
import RegisterForm from "#/components/domain/profile/register/RegisterForm";
import AuthService from "#/services/AuthService";

function RegisterPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const showPassword = useHookstate(false);
  const showConfirmPassword = useHookstate(false);

  const ui = useUIState();
  const { registerWithEmailAndPassword } = AuthService();

  useEffect(() => {
    ui?.setTitle("Crear cuenta");
  }, []);

  const handleClickShowPassword = () => {
    showPassword.set(!showPassword.get());
  };

  const handleClickShowConfirmPassword = () => {
    showConfirmPassword.set(!showConfirmPassword.get());
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    await registerWithEmailAndPassword(email, password);
  };

  return (
    <Container sx={style.container}>
      <HelmetMeta page="register" />
      <Box sx={style.welcome}>
        <SemiBold18>Bienvenido</SemiBold18>
        <Regular14>
          Regístrate para acceder a todos los beneficios de la plataforma y
          disfrutar de una experiencia personalizada.
        </Regular14>
      </Box>
      <RegisterForm
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        emailRef={emailRef}
        passwordRef={passwordRef}
        confirmPasswordRef={confirmPasswordRef}
        handleSubmit={handleSubmit}
        handleClickShowPassword={handleClickShowPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
    </Container>
  );
}

const style = {
  container: {},
  welcome: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "40px",
  },
};

export default RegisterPage;
