import { hookstate, useHookstate } from "@hookstate/core";
import { CHECKOUT_STEPS, ENCRYPT_KEY } from "#/config/constants.js";
import AES from "crypto-js/aes.js";
import Utf8 from "crypto-js/enc-utf8.js";
import { stateToString } from "#/utils/adapterUtil/index.js";
import { PAYMENT_METHODS } from "#/config/constants.js";

const getCheckoutFromCrypt = () => {
  const state = window.localStorage.getItem("state-state");
  if (!state) return null;
  var bytes = AES.decrypt(
    window.localStorage.getItem("state-state"),
    ENCRYPT_KEY
  );
  var stateText = bytes.toString(Utf8);
  return JSON.parse(stateText);
};
export const stateState = hookstate(() => {
  const state = getCheckoutFromCrypt();
  return {
    activeStep: CHECKOUT_STEPS?.ADDRESS,
    paymentMethod:
      state?.paymentMethod != null ? state?.paymentMethod : null,
    cardNumber: state?.cardNumber || "",
    showedCardNumber: state?.showedCardNumber || "",
    cardExpiration: state?.cardExpiration || "",
    cardCVC: state?.cardCVC || "",
    cardHolderName: state?.cardHolderName || "",
    paymentAddress: state?.paymentAddress || "",
    paymentCountry: state?.paymentCountry || "",
    paymentRegion: state?.paymentRegion || "",
    paymentCity: state?.paymentCity || "",
    paymentPostalCode: state?.paymentPostalCode || "",
    isFinishedAddedCard: state?.isFinishedAddedCard || false,
    completeName: state?.completeName || "",
    email: state?.email || "",
    phone: state?.phone || "",
    comments: state?.comments || "",
  };
});

export const useCheckoutState = () => {
  const state = useHookstate(stateState);

  //* Funcion para guardar el estado en el localstorage
  const addToLocalStorage = () => {
    const state_enc = AES.encrypt(
      JSON.stringify(state?.value),
      ENCRYPT_KEY
    ).toString();
    window.localStorage.setItem("state-state", state_enc);
  };

  //* Set active the next step
  const handleNextStep = () => {
    const activeStep = state.activeStep.get();
    const activeStepIndex = Object?.values(CHECKOUT_STEPS)?.findIndex(
      (step) => step === activeStep
    );
    if (activeStepIndex === Object?.values(CHECKOUT_STEPS)?.length - 1) {
      return;
    }
    const nextStepIndex = activeStepIndex + 1;
    state.activeStep.set(Object?.values(CHECKOUT_STEPS)[nextStepIndex]);
  };
  //* Set active the previous step
  const handlePreviousStep = () => {
    const activeStep = state.activeStep.get();
    const activeStepIndex = Object?.values(CHECKOUT_STEPS)?.findIndex(
      (step) => step === activeStep
    );
    if (activeStepIndex === 0) {
      return;
    }
    const previousStepIndex = activeStepIndex - 1;
    state.activeStep.set(Object?.values(CHECKOUT_STEPS)[previousStepIndex]);
  };

  //* Reset the active step
  const resetActiveStep = () => {
    state.activeStep.set(CHECKOUT_STEPS?.ADDRESS);
  };

  //* Limpia el estado de state
  const clearState = () => {
    state?.paymentMethod.set(null);
    state?.completeName.set("");
    state?.email.set("");
    state?.phone.set("");
    state?.comments.set("");
    state?.cardNumber.set("");
    state?.cardExpiration.set("");
    state?.cardCVC.set("");
    state?.cardHolderName.set("");
    state?.paymentAddress.set("");
    state?.paymentCountry.set("");
    state?.paymentRegion.set("");
    state?.paymentCity.set("");
    state?.showedCardNumber.set("");
    state?.isFinishedAddedCard.set(false);
  };

  const encryptCardPayment = () => {
    if (
      state?.paymentMethod?.get() === PAYMENT_METHODS?.find(({ code }) => code === "CARD")?.value &&
      state?.cardNumber?.get()?.replaceAll(" ", "")?.length >= 16 &&
      !state?.isFinishedAddedCard?.get() &&
      state?.cardExpiration?.get() &&
      state?.cardCVC?.get() &&
      state?.cardHolderName?.get()
    ) {
      const showedCardNumber = `**** **** **** ${state?.cardNumber?.get().slice(-4)}`
      const cardNumberEncrypted = AES.encrypt(JSON.stringify(state?.cardNumber?.get()),ENCRYPT_KEY).toString();
      const cardHolderNameEncrypted = AES.encrypt(JSON.stringify(state?.cardHolderName?.get()),ENCRYPT_KEY).toString();
      const cardExpirationEncrypted = AES.encrypt(JSON.stringify(state?.cardExpiration?.get()),ENCRYPT_KEY).toString();
      const cardCVCEncrypted = AES.encrypt(JSON.stringify(state?.cardCVC?.get()),ENCRYPT_KEY).toString();
      state?.cardNumber.set(cardNumberEncrypted);
      state?.cardHolderName.set(cardHolderNameEncrypted);
      state?.cardExpiration.set(cardExpirationEncrypted);
      state?.cardCVC.set(cardCVCEncrypted);
      state?.showedCardNumber.set(showedCardNumber);
      state?.isFinishedAddedCard.set(true);
    }
  }

  const cleanCardPayment = () => {
    state?.cardNumber.set("");
    state?.cardExpiration.set("");
    state?.cardCVC.set("");
    state?.cardHolderName.set("");
    state?.showedCardNumber.set("");
    state?.paymentCountry.set("");
    state?.paymentRegion.set("");
    state?.paymentAddress.set("");
    state?.paymentCity.set("");
    state?.paymentPostalCode.set("");
    state?.isFinishedAddedCard.set(false);
  };

  return {
    activeStep: state.activeStep.get(),
    setActiveStep: (step) => state.activeStep.set(step),
    handleNextStep,
    handlePreviousStep,
    paymentMethod: state.paymentMethod.get(),
    setPaymentMethod: (method) => state.paymentMethod.set(method),
    completeName: state.completeName.get(),
    setCompleteName: (name) => state.completeName.set(name),
    email: state.email.get(),
    setEmail: (email) => state.email.set(email),
    phone: state.phone.get(),
    setPhone: (phone) => state.phone.set(phone),
    comments: state.comments.get(),
    cardNumber: state.cardNumber.get(),
    setCardNumber: (cardNumber) => state.cardNumber.set(cardNumber),
    cardExpiration: state.cardExpiration.get(),
    setCardExpiration: (cardExpiration) => state.cardExpiration.set(cardExpiration),
    cardCVC: state.cardCVC.get(),
    setCardCVC: (cardCVC) => state.cardCVC.set(cardCVC),
    cardHolderName: state.cardHolderName.get(),
    setCardHolderName: (cardHolderName) => state.cardHolderName.set(cardHolderName),
    paymentAddress: state.paymentAddress.get(),
    setPaymentAddress: (paymentAddress) => state.paymentAddress.set(paymentAddress),
    paymentCountry: state.paymentCountry.get(),
    setPaymentCountry: (paymentCountry) => state.paymentCountry.set(paymentCountry),
    paymentRegion: state.paymentRegion.get(),
    setPaymentRegion: (paymentRegion) => state.paymentRegion.set(paymentRegion),
    paymentCity: state.paymentCity.get(),
    setPaymentCity: (paymentCity) => state.paymentCity.set(paymentCity),
    paymentPostalCode: state.paymentPostalCode.get(),
    setPaymentPostalCode: (paymentPostalCode) => state.paymentPostalCode.set(paymentPostalCode),
    showedCardNumber: state.showedCardNumber.get(),
    setShowedCardNumber: (showedCardNumber) => state.showedCardNumber.set(showedCardNumber),
    isFinishedAddedCard: state.isFinishedAddedCard.get(),
    encryptCardPayment,
    cleanCardPayment,
    setComments: (comments) => state.comments.set(comments),
    addToLocalStorage,
    hash: () => stateToString(state.get()),
    resetActiveStep,
    clearState,
  };
};
