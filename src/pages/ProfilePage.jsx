import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import AccountDetailsContainer from "#/components/domain/profile/AccountDetailsContainer";
import FavoritesDialog from "#/components/domain/profile/FavoritesDialog";
import OrdersAndMessages from "#/components/domain/profile/OrdersAndMessages";
import Preferences from "#/components/domain/profile/Preferences";
import Addresses from "#/components/domain/profile/Addresses";
import Divider from "@mui/material/Divider";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useAuthState } from "#/stores/AuthState";
import SignInOptions from "#/components/domain/profile/SignInOptions";
import GreetingProfile from "#/components/domain/profile/GreetingProfile";
import UnloggedSkeletonContainer from "#/components/domain/profile/skeletons/UnloggedSkeletonContainer";
import { useNavigate } from "react-router-dom";
import AuthService from "#/services/AuthService";

function ProfilePage() {
  const ui = useUIState();
  const auth = useAuthState();
  const navigate = useNavigate();
  const { loginWithGoogle } = AuthService();

  useEffect(() => {
    ui?.setTitle("");
  }, []);

  const handleRegister = () => {
    navigate("/profile/register");
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <Container sx={style.container}>
      <HelmetMeta page="profile" />

      {!auth?.isVerified && <UnloggedSkeletonContainer />}
      {auth?.isVerified && auth?.isAuthenticated === true && (
        <>
          <AccountDetailsContainer currentUser={auth.currentUser} />
          <FavoritesDialog />

          <Divider sx={style.divider} />
          <OrdersAndMessages />

          <Divider sx={style.divider} />
          <Preferences />
          <Divider sx={style.divider} />

          <Addresses />
        </>
      )}
      {auth?.isVerified && auth?.isAuthenticated === false && (
        <>
          <GreetingProfile />
          <SignInOptions
            handleRegister={handleRegister}
            handleGoogleLogin={handleGoogleLogin}
          />
        </>
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
  divider: {
    width: "100%",
  },
};

export default ProfilePage;
