import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import HorizontalScroller from "#/components/shared/HorizontalScroller";
import ProductCardContainer from "#/components/domain/menu/ProductCardContainer";
import DataService from "#/services/DataService";
import { useMemo } from "react";

export default function OffersContainer() {
  const { menu, offers } = DataService();

  const offeredProducts = useMemo(
    () =>
      menu?.filter((item) =>
        offers?.some((offer) => offer?.product == item?._id)
      ),
    [menu, offers]
  );

  const handleClick = (product) => {
    console.log(product);
  };

  return (
    <Box sx={style.container}>
      <Regular18>Ofertas</Regular18>
      <HorizontalScroller>
        {offeredProducts?.map((item) => (
          <ProductCardContainer
            key={item?._id}
            product={item}
            offer={offers?.find((offer) => offer?.product === item?._id)}
            handleClick={handleClick}
          />
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
    gap: "32px",
  },
};
