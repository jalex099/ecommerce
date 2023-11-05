import Box from "@mui/material/Box";
import { useMemo } from "react";
import ProductCardContainer from "#/components/domain/menu/ProductCardContainer";

function ProductsList({ category, products }) {
  const productsToShow = useMemo(() => {
    return products?.filter((product) => product.category === category);
  }, [category, products]);
  return (
    <Box sx={style?.container} className="py-4">
      {productsToShow?.map((product) => (
        <ProductCardContainer key={product?._id} product={product} />
      ))}
    </Box>
  );
}

const style = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "8px",
  },
};

export default ProductsList;
