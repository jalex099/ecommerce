import Box from "@mui/material/Box";
import HorizontalScroller from "#/components/shared/HorizontalScroller";
import ProductCardContainer from "#/components/domain/menu/ProductCardContainer";
import DataService from "#/services/DataService";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import { useMemo } from "react";
import RedirectionService from "#/services/RedirectionService";
import { isPast, parseISO } from "date-fns";

export default function OffersContainer() {
  const { menu, offers } = DataService();
  const { redirectToProduct } = RedirectionService();
  const offeredProducts = useMemo(
    () =>
      menu?.filter((item) =>
        offers?.some((offer) => offer?.product == item?._id && !isPast(parseISO(offer?.to)))
      ),
    [menu, offers]
  );

  const handleProductClick = (productId) => {
    redirectToProduct(productId);
  };

  if (!offeredProducts?.length) return null;
  return (
    <Box sx={style.container}>
      <SemiBold18>Productos en oferta</SemiBold18>
      <HorizontalScroller>
        {offeredProducts?.map((item) => (
          <Box key={item?._id} className="min-w-[140px] w-[140px] h-[258px] my-1 ">
            <ProductCardContainer
              product={item}
              offer={offers?.find((offer) => offer?.product === item?._id)}
              handleClick={handleProductClick}
              showOfferExpiration
            />
          </Box>
        ))}
      </HorizontalScroller>
    </Box>
  );
}
const style = {
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
  },
};
