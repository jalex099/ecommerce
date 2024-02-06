import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import GoBackIcon from "#/components/shared/GoBackIcon";
import StepperIndicator from "#/components/domain/checkout/StepperIndicator";
import { CHECKOUT_STEPS } from "#/config/constants.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { addToast } from "#/stores/UIState.js";
import useValidateCheckout
  from "#/components/domain/checkout/controllers/useValidateCheckout.js";
function CheckoutTopBar() {
  const checkoutState = useCheckoutState();
  const { isValidStep } = useValidateCheckout();
  const handleClick = (index) => {
    if (!isValidStep()){
      addToast("Debes completar los campos requeridos", "error");
      return
    }
    checkoutState?.setActiveStep(index);
  }
  return (
    <Box>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar
          sx={{
            gridTemplateColumns: "32px 1fr",
          }}
        >
          <GoBackIcon />
          <StepperIndicator steps={CHECKOUT_STEPS} activeStep={checkoutState?.activeStep} handleClick={handleClick}/>
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default CheckoutTopBar;
