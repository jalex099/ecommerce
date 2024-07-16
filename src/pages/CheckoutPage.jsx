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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartState } from "#/stores/cart";
import GeneralInformationForm from "#/components/domain/checkout/GeneralInformationForm.jsx";
import DeliveryInfoContainer from "#/components/domain/checkout/DeliveryInfoContainer.jsx";
import Divider from "@mui/material/Divider";
import DateAndTimeInfoContainer from "#/components/domain/checkout/DateAndTimeInfoContainer.jsx";
import { useLocationState } from "#/stores/LocationState.js";
import useValidateCheckout from "#/components/domain/checkout/controllers/useValidateCheckout.js";
import useOrderParser from "#/components/domain/checkout/controllers/useOrderParser.js";
import OrderService from "#/services/OrderService.js";
import ReviewContainer from "#/components/domain/checkout/ReviewContainer.jsx";
import { addToast } from "#/stores/UIState.js";
import ClientUserDetailService from "#/services/ClientUserDetailService.js";
import { useAuthState } from "#/stores/AuthState.js";
import DataService from "#/services/DataService.js";
import { authState } from "#/stores/AuthState.js";
import AlreadyHaveAccount from "#/components/domain/checkout/AlreadyHaveAccount.jsx";
import serializeState from "#/utils/serializeState.js";

const CheckoutPage = () => {
  const ui = useUIState();
  const checkoutState = useCheckoutState();
  const locationState = useLocationState();
  const { isValidStep } = useValidateCheckout();
  const cart = useCartState();
  const navigate = useNavigate();
  const { parseOrder } = useOrderParser();
  const { saveOrder } = OrderService();
  const [searchParams] = useSearchParams();
  const { userDetail} = ClientUserDetailService();
  const auth = useAuthState();
  const { regions, parameters } = DataService();

  useEffect(() => {
    ui?.setTitle("Pago");
  }, []);

  useEffect(() => {
    if (cart?.getItemsCounter() === 0) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (searchParams?.get("errorPago")) {
      addToast("Hubo un error al procesar el pago", "error");
      checkoutState?.setActiveStep(CHECKOUT_STEPS?.REVIEW);
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      checkoutState?.resetActiveStep();
    };
  }, []);

  useEffect(() => {
    if(!checkoutState?.email || checkoutState?.email === ''){
      checkoutState?.setEmail(auth?.currentUser?.email);
    }
    if(!checkoutState?.completeName || checkoutState?.completeName === ''){
      checkoutState?.setCompleteName(auth?.currentUser?.displayName);
    }
  }, [auth?.currentUser?.email, auth?.currentUser?.displayName]);

  useEffect(() => {
    if(!userDetail) return;
    if(userDetail?.phone){
      checkoutState?.setPhone(userDetail?.phone);
    }
    if(userDetail?.paymentAddress){
      checkoutState?.setPaymentAddress(userDetail?.paymentAddress);
    }
    if(userDetail?.paymentCountry){
      checkoutState?.setPaymentCountry(userDetail?.paymentCountry);
    }
    if(userDetail?.paymentRegion){
      checkoutState?.setPaymentRegion(userDetail?.paymentRegion);
      checkoutState?.setPaymentRegionName(regions?.find(country => country?.id === userDetail?.paymentCountry)?.regions?.find(region => region?.id === userDetail?.paymentRegion)?.name || "");
    }
    if(userDetail?.paymentCity){
      checkoutState?.setPaymentCity(userDetail?.paymentCity);
    }
    if(userDetail?.paymentPostalCode){
      checkoutState?.setPaymentPostalCode(userDetail?.paymentPostalCode);
    }
  }, [userDetail]);

  useEffect(() => {
    const shouldAddDeliveryCost = locationState?.delivery !== null && (cart?.getShipping() === 0);
    const shouldRemoveDeliveryCost = locationState?.delivery === null && (cart?.getShipping() !== 0);

    if (shouldAddDeliveryCost) {
      cart?.addShipping(Number(parameters?.find(param => param?.name === 'DELIVERY_COST')?.value) || 0);
    } else if (shouldRemoveDeliveryCost) {
      cart?.removeShipping();
    }
  }, [locationState?.selected]);

  const handleConfirmOrder = () => {
    const order = parseOrder();
    saveOrder?.mutate(order);
  };

  return (
    <Container sx={style.container}>
      <HelmetMeta page="checkout" />
      {checkoutState?.activeStep === CHECKOUT_STEPS?.ADDRESS && (
        <Box className={"flex flex-col gap-4 w-full flex-1"}>
          <DeliveryInfoContainer />
          <Divider />
          <DateAndTimeInfoContainer />
          <Divider />
          {
            !auth?.isAuthenticated && !!auth?.isVerified && (
              <>
                <AlreadyHaveAccount />
              </>
            )
          }
          <GeneralInformationForm />
        </Box>
      )}
      {/*{checkoutState?.activeStep === CHECKOUT_STEPS?.PAYMENT && (*/}
      {/*  <PaymentContainer />*/}
      {/*)}*/}
      {checkoutState?.activeStep === CHECKOUT_STEPS?.REVIEW && (
        <ReviewContainer />
      )}
      <Box className="sticky bottom-4 left-0 right-0 z-10 w-full">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValidStep()}
          onClick={
            checkoutState?.activeStep === CHECKOUT_STEPS?.REVIEW
              ? handleConfirmOrder
              : checkoutState?.handleNextStep
          }
        >
          {checkoutState?.activeStep === CHECKOUT_STEPS?.REVIEW
            ? "Confirmar y pagar"
            : "Continuar"}
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
