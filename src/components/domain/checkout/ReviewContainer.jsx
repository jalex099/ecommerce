import Box from "@mui/material/Box";
import ProductsView
  from "#/components/domain/checkout/review/ProductsView.jsx";
import { useMemo } from "react";
import { useCartState } from "#/stores/cart";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils.js";
import Divider from "@mui/material/Divider";
import ProductsLabelView
  from "#/components/domain/checkout/review/ProductsLabelView.jsx";
import CheckoutCartResumeInfo
  from "#/components/domain/checkout/review/CheckoutCartResumeInfo.jsx";
import OrderInfo from "#/components/domain/checkout/review/OrderInfo.jsx";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { useLocationState } from "#/stores/LocationState.js";


const ReviewContainer = () => {
  const cart = useCartState();
  const checkout = useCheckoutState();
  const location = useLocationState();
  const { getItemsToShow } = useCartUtils();

  const itemsToShow = useMemo(
    () => getItemsToShow(),
    [cart?.getItemsCounter()]
  );

  return (
    <Box className={"w-full flex-1 flex flex-col gap-8"}>
      <ProductsView products={itemsToShow}/>
      <Divider/>
      <OrderInfo info={{ ...checkout, ...location }}/>
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