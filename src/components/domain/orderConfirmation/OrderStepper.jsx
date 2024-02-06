
import { ORDER_STEPS } from "#/config/constants";
import StepperIndicator
  from "#/components/domain/checkout/StepperIndicator.jsx";

const OrderStepper = ({ activeStep }) => {

  return (
      <StepperIndicator steps={ORDER_STEPS} activeStep={activeStep} useValues/>
  );
}

export default OrderStepper;