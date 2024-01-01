import { hookstate, useHookstate } from "@hookstate/core";
import { CHECKOUT_STEPS } from "#/config/constants.js";

export const checkoutState = hookstate({
  activeStep: CHECKOUT_STEPS?.ADDRESS,
  paymentMethod: null,
  date: null,
  time: null,
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

  //* Set the date parsed
  const setDate = (date) => {
    state.date.set(date);
  };

  //* Set the time parsed
  const setTime = (time) => {
    state.time.set(time);
  };

  return {
    activeStep: state.activeStep.get(),
    setActiveStep: (step) => state.activeStep.set(step),
    handleNextStep,
    handlePreviousStep,
    paymentMethod: state.paymentMethod.get(),
    setPaymentMethod: (method) => state.paymentMethod.set(method),
    date: state.date.get(),
    setDate,
    time: state.time.get(),
    setTime,
  };
};
