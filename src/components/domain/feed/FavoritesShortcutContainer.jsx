import Box from "@mui/material/Box";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import DataService from "#/services/DataService.js";
import Chip from "@mui/material/Chip";
import HeartOnIcon from "#/components/shared/icons/HeartOnIcon.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import RedirectionService from "#/services/RedirectionService.js";

const FavoritesShortcutContainer = ({ favorites }) => {
  const { menu } = DataService();
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
            <Chip
              key={favorite._id}
              className={""}
              label={menu?.find((item) => item._id === favorite?.product)?.name}
              sx={{
                "& .MuiChip-label": {
                  padding: "0px",
                  fontSize: "14px",
                  fontWeight: "600",
                },
                minWidth: "auto",
                bgcolor: index%2 === 0 ? "primary20.main" : "primary10.main",
              }}
              // icon={<HeartOnIcon className={"w-4 h-4"} />}
              onClick={() => handleProductClick(favorite?.product)}
            />
          ))
        }
      </HorizontalScroller>
    </Box>
  )
}

export default FavoritesShortcutContainer;