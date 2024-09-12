import { useLocationState } from "#/stores/LocationState.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { CHECKOUT_STEPS, PHONE_REGEX } from "#/config/constants.js";

export default function useValidateCheckout() {
  const locationState = useLocationState();
  const checkoutState = useCheckoutState();

  const isValidStep = () => {
    let isValid = true;
    switch (checkoutState?.activeStep) {
      case CHECKOUT_STEPS?.ADDRESS:
        const isDeliveryValid = validateDelivery();
        const isDateTimeValid = validateDateTime();
        const isGeneralFormValid = validateGeneralForm();
        isValid = isDeliveryValid && isDateTimeValid && isGeneralFormValid;
        break;
      case CHECKOUT_STEPS?.PAYMENT:
      case CHECKOUT_STEPS?.REVIEW:
        const isPaymentValid = validatePayment();
        isValid = isPaymentValid;
        break;
      default:
        break;
    }
    return isValid;
  };

  const validateDelivery = () => {
    const selectedDelivery = locationState?.selected;
    if (selectedDelivery == null) {
      return false;
    }
    switch (selectedDelivery) {
      case 0:
        return isValidAddress();
      case 1:
        return isValidShop();
      case 2:
        return isValidMeetup();
      default:
        return false;
    }
  };

  const validateDateTime = () => {
    const dateTime = locationState?.dateTime;
    if (!dateTime) {
      return false;
    }
    return true;
  };

  const validateGeneralForm = () => {
    if (
      !checkoutState?.completeName ||
      !checkoutState?.email ||
      !checkoutState?.phone?.match(PHONE_REGEX)
    ) {
      return false;
    }
    return true;
  };

  const isValidAddress = () => {
    const address = locationState?.delivery;
    if (
      !address ||
      !address?.street ||
      !address?.houseNumber ||
      !address?.latitude ||
      !address?.longitude
    ) {
      return false;
    }
    return true;
  };

  const isValidShop = () => {
    const shop = locationState?.shop;
    if (!shop || !shop?._id) {
      return false;
    }
    return true;
  };

  const isValidMeetup = () => {
    const meetup = locationState?.meetup;
    if (!meetup || !meetup?._id) {
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    const paymentMethod = checkoutState?.paymentMethod;
    if (paymentMethod == null) {
      return false;
    }
    switch (paymentMethod) {
      case 0:
        return isValidCash();
      case 1:
        return isValidCard();
      case 2:
        return isValidTransfer();
      default:
        return false;
    }
  };

  const isValidCash = () => {
    return true;
  };

  const isValidCard = () => {
    if (
      !checkoutState?.cardNumber ||
      !checkoutState?.cardHolderName ||
      !checkoutState?.cardExpiration ||
      !checkoutState?.cardCVC
    ) {
      return false;
    }
    return true;
  };

  const isValidTransfer = () => {
    return true;
  };

  return {
    isValidStep,
    validatePayment,
  };
}
