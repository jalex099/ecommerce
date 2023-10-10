import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState";
import AccountDetailsContainer from "#/components/domain/profile/AccountDetailsContainer";
import FavoritesDialog from "#/components/domain/profile/FavoritesDialog";
import OrdersAndMessages from "#/components/domain/profile/OrdersAndMessages";
import Preferences from "#/components/domain/profile/Preferences";
import Addresses from "#/components/domain/profile/Addresses";
import Divider from "@mui/material/Divider";

function ProfilePage() {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("");
  }, []);

  return (
    <Container sx={style.container}>
      <AccountDetailsContainer />
      <FavoritesDialog />

      <Divider sx={style.divider} />
      <OrdersAndMessages />

      <Divider sx={style.divider} />
      <Preferences />
      <Divider sx={style.divider} />
      <Addresses />
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
