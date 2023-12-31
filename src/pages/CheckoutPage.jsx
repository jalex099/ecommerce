import { useEffect } from "react";
import { useUIState } from "#/stores/UIState.js";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { CHECKOUT_STEPS } from "#/config/constants";
import ShippingAddressContainer from "#/components/domain/checkout/ShippingAddressContainer";
import PaymentContainer from "#/components/domain/checkout/PaymentContainer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const CheckoutPage = () => {
  const ui = useUIState();
  const checkoutState = useCheckoutState();
  useEffect(() => {
    ui?.setTitle("Pago");
  }, []);
  return (
    <Container sx={style.container}>
      <HelmetMeta page="checkout" />
      {checkoutState?.activeStep === CHECKOUT_STEPS?.ADDRESS && (
        <ShippingAddressContainer />
      )}
      {checkoutState?.activeStep === CHECKOUT_STEPS?.PAYMENT && (
        <PaymentContainer />
      )}
      <Box className="sticky bottom-0 left-0 right-0 z-10 p-6 w-full">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={checkoutState?.handleNextStep}
        >
          Continuar
        </Button>
      </Box>
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
    minHeight: "calc(100dvh - 70px)",
    flexGrow: 1,
    gap: "32px",
    justifyContent: "flex-start",
  },
};

export default CheckoutPage;
