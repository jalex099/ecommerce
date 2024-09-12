import HelmetMeta from "#/components/shared/HelmetMeta";
import { useEffect } from "react";
import { useUIState } from "#/stores/UIState";
import { useCartState } from "#/stores/cart";
import { useMemo } from "react";
import CartItemsContainer from "#/components/domain/cart/CartItemsContainer";
import CartResumeInfo from "#/components/domain/cart/CartResumeInfo";
import { useNavigate } from "react-router-dom";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import DataService from "#/services/DataService";
import EmptyCartContainer from "#/components/domain/cart/EmptyCartContainer";
import Container from "@mui/material/Container";

function CartPage() {
  const ui = useUIState();
  const cart = useCartState();
  const { getItemsToShow, getDetails } = useCartUtils();
  const navigate = useNavigate();
  const { isLoading } = DataService();

  useEffect(() => {
    ui?.setTitle("Carrito");
  }, []);

  const itemsToShow = useMemo(
    () => getItemsToShow(),
    [cart?.getItemsCounter(), isLoading]
  );

  const handleGoToMenu = () => {
    navigate("/menu", { replace: true });
  };

  return (
    <Container sx={style.container}>
      <HelmetMeta page="cart" />
      {itemsToShow == undefined && !isLoading && (
        <EmptyCartContainer onClick={handleGoToMenu} />
      )}
      {!!itemsToShow && itemsToShow?.length > 0 && (
        <>
          <CartItemsContainer products={itemsToShow} getDetails={getDetails} />
          <CartResumeInfo
            numberOfItems={cart?.getItemsCounter()}
            products={itemsToShow}
            subtotal={cart?.getSubTotal()}
            discount={cart?.getDescuento()}
            total={cart?.getTotal()}
          />
        </>
      )}
    </Container>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    minHeight: "calc(100vh - 70px)",
    paddingTop: "16px",
    flexGrow: 1,
    px: "0 !important",
    position: "relative",
  },
};

export default CartPage;
