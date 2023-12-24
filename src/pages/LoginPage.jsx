import SignInOptions from "#/components/domain/profile/SignInOptions";
import GreetingProfile from "#/components/domain/profile/GreetingProfile";
import { useNavigate } from "react-router-dom";
import AuthService from "#/services/AuthService";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import { useAuthState } from "#/stores/AuthState";
import UnloggedSkeletonContainer from "#/components/domain/profile/skeletons/UnloggedSkeletonContainer";
import HelmetMeta from "#/components/shared/HelmetMeta";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook } = AuthService();
  const ui = useUIState();
  const auth = useAuthState();

  useEffect(() => {
    ui?.setTitle("");
  }, []);

  useEffect(() => {
    if (auth?.isAuthenticated && auth?.isVerified) {
      navigate("/perfil", { replace: true });
    }
  }, [auth?.isVerified, auth?.isAuthenticated]);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handleFacebookLogin = async () => {
    await loginWithFacebook();
  };
  return (
    <Container sx={style.container}>
      <HelmetMeta page="login" />
      {!auth?.isVerified && <UnloggedSkeletonContainer />}
      {auth?.isVerified && <GreetingProfile />}
      {auth?.isVerified && (
        <SignInOptions
          handleRegister={handleRegister}
          handleGoogleLogin={handleGoogleLogin}
          handleFacebookLogin={handleFacebookLogin}
        />
      )}
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
  },
};
