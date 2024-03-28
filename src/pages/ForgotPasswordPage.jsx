import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import Box from "@mui/material/Box";
import { useUIState, addToast } from "#/stores/UIState";
import { useEffect, useMemo, useRef } from "react";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import Regular14 from "#/components/shared/fonts/Regular14";
import AuthService from "#/services/AuthService";
import ForgotPasswordForm
  from "#/components/domain/profile/forgotPassword/ForgotPasswordForm.jsx";
import { useHookstate } from "@hookstate/core";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const emailRef = useRef(null);
  const ui = useUIState();
  const { sendEmailResetPassword } = AuthService();
  const isDone = useHookstate(false);

  useEffect(() => {
    ui?.setTitle("Restablecer contraseña");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    //* If email is not regex valid
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      addToast("Correo electrónico inválido", "error");
      return;
    }
    await sendEmailResetPassword(email);

    //* clear input
    isDone.set(true);
    emailRef.current.value = "";
  };

  return (
    <Container sx={style.container}>
      <HelmetMeta page="register" />
      <Box sx={style.welcome}>
        <SemiBold18>Lo lamentamos mucho...</SemiBold18>
        <Regular14>
          Por favor, ingresa tu correo electrónico para restablecer tu contraseña.
        </Regular14>
      </Box>
      <ForgotPasswordForm
        emailRef={emailRef}
        handleSubmit={handleSubmit}
      />
      {
        isDone.get() && (
          <Box className={"mt-6"}>
            <Regular14 className={"mt-6"}>
              <Link to={"/login"}>Volver al inicio de sesi&oacute;n</Link>
            </Regular14>
          </Box>
        )
      }

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

export default ForgotPasswordPage;
