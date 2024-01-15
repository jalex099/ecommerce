import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { useLocationState } from "#/stores/LocationState.js";

function GoBackIcon({ styles = {}, containerStyle = {} }) {
  const checkoutState = useCheckoutState();
  const locationState = useLocationState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClick = () => {
    if (pathname === "/pago" && checkoutState?.activeStep !== 0) {
      checkoutState?.handlePreviousStep();
      return;
    }
    if(pathname === "/metodo-de-entrega"){
      if(locationState?.step === 0){
        navigate(-1);
        return
      }
      locationState?.prevStep();
      return
    }
    navigate(-1);
  };

  return (
    <Box sx={containerStyle} onClick={handleClick}>
      <ArrowBackIcon fontSize="32px" sx={styles} />
    </Box>
  );
}

export default GoBackIcon;
