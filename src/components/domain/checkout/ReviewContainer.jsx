import Box from "@mui/material/Box";
import ProductsImageView
  from "#/components/domain/checkout/review/ProductsImageView.jsx";
import { useMemo } from "react";
import { useCartState } from "#/stores/cart";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils.js";
import Divider from "@mui/material/Divider";
import ProductsLabelView
  from "#/components/domain/checkout/review/ProductsLabelView.jsx";
import CheckoutCartResumeInfo
  from "#/components/domain/checkout/review/CheckoutCartResumeInfo.jsx";


const ReviewContainer = () => {
  const cart = useCartState();
  const { getItemsToShow } = useCartUtils();

  const itemsToShow = useMemo(
    () => getItemsToShow(),
    [cart?.getItemsCounter()]
  );

  return (
    <Box className={"w-full flex-1 flex flex-col gap-8"}>
      <Box className={"flex gap-1 flex-col"}>
        <ProductsImageView products={itemsToShow}/>
        <ProductsLabelView products={itemsToShow}/>
      </Box>
      <Divider/>
      <CheckoutCartResumeInfo
        numberOfItems={cart?.getItemsCounter()}
        products={itemsToShow}
        subtotal={cart?.getSubTotal()}
        discount={cart?.getDescuento()}
        total={cart?.getTotal()}/>
    </Box>
  )
}

export default ReviewContainer