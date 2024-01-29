import { useEffect, useMemo } from "react";
import { useUIState } from "#/stores/UIState.js";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { CHECKOUT_STEPS } from "#/config/constants";
import ShippingContainer from "#/components/domain/delivery/ShippingContainer.jsx";
import PaymentContainer from "#/components/domain/checkout/PaymentContainer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useCartState } from "#/stores/cart";
import GeneralInformationForm
  from "#/components/domain/checkout/GeneralInformationForm.jsx";
import DeliveryInfoContainer
  from "#/components/domain/checkout/DeliveryInfoContainer.jsx";
import Divider from "@mui/material/Divider";
import DateAndTimeInfoContainer
  from "#/components/domain/checkout/DateAndTimeInfoContainer.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import useValidateCheckout
  from "#/components/domain/checkout/controllers/useValidateCheckout.js";
import ReviewContainer from "#/components/domain/checkout/ReviewContainer.jsx";

const CheckoutPage = () => {
  const ui = useUIState();
  const checkoutState = useCheckoutState();
  const locationState = useLocationState();
  const { isValidStep} = useValidateCheckout()
  const cart = useCartState();
  const navigate = useNavigate();

  useEffect(() => {
    ui?.setTitle("Pago");
  }, []);

  useEffect(() => {
    if (cart?.getItemsCounter() === 0) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    return () => {
      checkoutState?.resetActiveStep();
    }
  }, []);

  return (
    <Container sx={style.container}>
      <HelmetMeta page="checkout" />
      {checkoutState?.activeStep === CHECKOUT_STEPS?.ADDRESS && (
        <Box className={'flex flex-col gap-4 w-full flex-1'}>
          <DeliveryInfoContainer />
          <Divider />
          <DateAndTimeInfoContainer />
          <Divider />
          <GeneralInformationForm />
        </Box>
      )}
      {checkoutState?.activeStep === CHECKOUT_STEPS?.PAYMENT && (
        <PaymentContainer />
      )}
      {
        checkoutState?.activeStep === CHECKOUT_STEPS?.REVIEW && (
          <ReviewContainer />
        )
      }
      <Box className="sticky bottom-0 left-0 right-0 z-10 w-full">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValidStep()}
          onClick={checkoutState?.handleNextStep}
        >
          {
            checkoutState?.activeStep === CHECKOUT_STEPS?.REVIEW ? 'Confirmar y pagar' : 'Continuar'
          }
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
