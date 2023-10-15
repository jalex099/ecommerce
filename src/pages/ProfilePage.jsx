import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState";
import AccountDetailsContainer from "#/components/domain/profile/AccountDetailsContainer";
import FavoritesDialog from "#/components/domain/profile/FavoritesDialog";
import OrdersAndMessages from "#/components/domain/profile/OrdersAndMessages";
import Preferences from "#/components/domain/profile/Preferences";
import Addresses from "#/components/domain/profile/Addresses";
import Divider from "@mui/material/Divider";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useAuthState } from "#/hooks/AuthState";
import SignInOptions from "#/components/domain/profile/SignInOptions";
import GreetingProfile from "#/components/domain/profile/GreetingProfile";
import UnloggedSkeletonContainer from "#/components/domain/profile/skeletons/UnloggedSkeletonContainer";
import ClientAddressService from "#/services/ClientAddressService";
import ClientPreferenceService from "#/services/ClientPreferenceService";
import ClientFavoriteProductsService from "#/services/ClientFavoriteProductsService";

function ProfilePage() {
  const ui = useUIState();
  const auth = useAuthState();
  const { addresses, isLoading: isLoadingAddresses } = ClientAddressService();
  const { preferences, isLoading: isLoadingPreferences } =
    ClientPreferenceService();
  const { favoriteProducts, isLoading: isLoadingFavoriteProducts } =
    ClientFavoriteProductsService();
  useEffect(() => {
    ui?.setTitle("");
  }, []);

  return (
    <Container sx={style.container}>
      <HelmetMeta page="profile" />

      {!auth?.isVerified && <UnloggedSkeletonContainer />}
      {auth?.isVerified && auth?.isAuthenticated === true && (
        <>
          <AccountDetailsContainer currentUser={auth.currentUser} />
          <FavoritesDialog
            items={favoriteProducts}
            isLoading={isLoadingFavoriteProducts}
          />

          <Divider sx={style.divider} />
          <OrdersAndMessages />

          <Divider sx={style.divider} />
          <Preferences items={preferences} isLoading={isLoadingPreferences} />
          <Divider sx={style.divider} />

          <Addresses items={addresses} isLoading={isLoadingAddresses} />
        </>
      )}
      {auth?.isVerified && auth?.isAuthenticated === false && (
        <>
          <GreetingProfile />
          <SignInOptions />
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
