import Box from "@mui/material/Box";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import RedirectionService from "#/services/RedirectionService.js";
import FavoritesCard from "#/components/domain/feed/FavoritesCard.jsx";

const FavoritesShortcutContainer = ({ favorites }) => {
  const { redirectToProduct } = RedirectionService();

  const handleProductClick = (productId) => {
    redirectToProduct(productId);
  }

  return (
    <Box className={"w-full min-h-[60px] flex flex-col gap-0"}>
      <SemiBold18>
        Favoritos
      </SemiBold18>
      <HorizontalScroller separate>
        {
          favorites?.map((favorite, index) => (
            <FavoritesCard key={index} favorite={favorite}
                           onClick={() => handleProductClick(favorite?.product)} />
          ))
        }
      </HorizontalScroller>
    </Box>
  )
}

export default FavoritesShortcutContainer;