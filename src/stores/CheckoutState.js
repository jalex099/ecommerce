import { hookstate, useHookstate } from "@hookstate/core";
// import { findKey, setKey } from "#/utils/localStorageHelper.js";
import { CHECKOUT_STEPS } from "#/config/constants.js";
// import { useEffect } from "react";

export const checkoutState = hookstate({
  activeStep: CHECKOUT_STEPS?.ADDRESS,
  deliveryMethod: null,
});

export const useCheckoutState = () => {
  const state = useHookstate(checkoutState);

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

  return {
    activeStep: state.activeStep.get(),
    setActiveStep: (step) => state.activeStep.set(step),
    handleNextStep,
    handlePreviousStep,
    deliveryMethod: state.deliveryMethod.get(),
    setDeliveryMethod: (method) => state.deliveryMethod.set(method),
  };
};
