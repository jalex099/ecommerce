import { hookstate, useHookstate } from "@hookstate/core";
import { CHECKOUT_STEPS, ENCRYPT_KEY } from "#/config/constants.js";
import AES from "crypto-js/aes.js";
import Utf8 from "crypto-js/enc-utf8.js";
import { stateToString } from "#/utils/adapterUtil/index.js";

const getCheckoutFromCrypt = () => {
  const checkout = window.localStorage.getItem("checkout-state");
  if (!checkout) return null;
  var bytes = AES.decrypt(
    window.localStorage.getItem("checkout-state"),
    ENCRYPT_KEY
  );
  var checkoutText = bytes.toString(Utf8);
  return JSON.parse(checkoutText);
};
export const checkoutState = hookstate(() => {
  const checkout = getCheckoutFromCrypt();
  return {
    activeStep: CHECKOUT_STEPS?.ADDRESS,
    paymentMethod:
      checkout?.paymentMethod != null ? checkout?.paymentMethod : null,
    completeName: checkout?.completeName || "",
    email: checkout?.email || "",
    phone: checkout?.phone || "",
    comments: checkout?.comments || "",
  };
});

export const useCheckoutState = () => {
  const state = useHookstate(checkoutState);

  //* Funcion para guardar el estado en el localstorage
  const addToLocalStorage = () => {
    const checkout_enc = AES.encrypt(
      JSON.stringify(state?.value),
      ENCRYPT_KEY
    ).toString();
    window.localStorage.setItem("checkout-state", checkout_enc);
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

  //* Limpia el estado de checkout
  const clearState = () => {
    state?.paymentMethod.set(null);
    state?.completeName.set("");
    state?.email.set("");
    state?.phone.set("");
    state?.comments.set("");
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
    setComments: (comments) => state.comments.set(comments),
    addToLocalStorage,
    hash: () => stateToString(state.get()),
    resetActiveStep,
    clearState,
  };
};
