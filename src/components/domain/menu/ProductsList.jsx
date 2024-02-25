import Box from "@mui/material/Box";
import { useMemo } from "react";
import ProductCardContainer from "#/components/domain/menu/ProductCardContainer";
import { isPast, parseISO } from "date-fns";

function ProductsList({ category, products, offers, handleClick }) {
  const productsToShow = useMemo(() => {
    return products?.filter((product) => product.category === category);
  }, [category, products]);
  return (
    <Box sx={style?.container} className="py-4">
      {productsToShow?.map((product) => (
        <ProductCardContainer
          key={product?._id}
          product={product}
          offer={offers?.find(
            (offer) =>
              offer.product === product._id && !isPast(parseISO(offer?.to))
          )}
          handleClick={handleClick}
        />
      ))}
    </Box>
  );
}

const style = {
  container: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr 1fr",
      lg: "1fr 1fr 1fr",
    },
    gridGap: "8px",
  },
};

export default ProductsList;
