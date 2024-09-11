import { useEffect } from "react";
import { useUIState } from "#/stores/UIState.js";
import Container from "@mui/material/Container";
import SliderComponent from "#/components/domain/feed/SliderComponent.jsx";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import NewContent from "#/components/domain/feed/NewContent.jsx";
import Box from "@mui/material/Box";
import OffersContainer from "#/components/domain/feed/OffersContainer.jsx";
import { useCartState } from "#/stores/cart";
import CartAdvise from "#/components/domain/feed/CartAdvise.jsx";
import OrderService from "#/services/OrderService.js";
import NotFinishedOrdersAdvise from "#/components/domain/feed/NotFinishedOrdersAdvise.jsx";
import ClientFavoriteProductsService from "#/services/ClientFavoriteProductsService.js";
import FavoritesShortcutContainer from "#/components/domain/feed/FavoritesShortcutContainer.jsx";
// import Waves from "#/components/shared/Waves.jsx";
import WelcomeContainer from "#/components/domain/feed/WelcomeContainer";
import { useAuthState } from "#/stores/AuthState";
import ClientUserDetailService from "#/services/ClientUserDetailService.js";
import { COMPANY } from "#/config/constants";
import CategoriesFeedLink from "#/components/domain/feed/CategoriesFeedLink.jsx";
import SuggestionsContainer from "#/components/domain/feed/SuggestionsContainer.jsx";

const FeedPage = () => {
  const ui = useUIState();
  const cart = useCartState();
  const { notFinishedOrders } = OrderService();
  const { favoriteProducts } = ClientFavoriteProductsService();
  const auth = useAuthState();
  const { userDetail, isLoading } = ClientUserDetailService();

  useEffect(() => {
    ui?.setTitle(COMPANY);
  }, []);

  return (
    <Container sx={style.container}>
      <HelmetMeta page="feed" />
      <Box className="w-full flex flex-col gap-8">
        <Box
          className="flex flex-col gap-2 px-6 py-1 w-full"
          // style={{
          //   backgroundImage:
          //     "radial-gradient(800px at 0 150%, #e9eef5 0, transparent 100%)",
          // }}
        >
          <WelcomeContainer
            name={userDetail?.alias}
            isLoading={isLoading}
            isAuthenticated={auth?.isAuthenticated && auth?.isVerified}
          />
          {/* <CategoriesFeedLink /> */}
        </Box>
        <SliderComponent />
        <Box className={"w-full flex flex-col gap-6 lg:flex-row justify-center items-start"}>
          {cart?.getItemsCounter() > 0 && <CartAdvise />}
          {notFinishedOrders?.length > 0 && <NotFinishedOrdersAdvise />}
        </Box>
        {favoriteProducts?.length > 0 && (
          <FavoritesShortcutContainer favorites={favoriteProducts} />
        )}
        <OffersContainer />
        <SuggestionsContainer />
      </Box>
      <NewContent />
    </Container>
  );
};

const style = {
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "32px",
  },
};

export default FeedPage;
