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
  const params = new URLSearchParams(location.search);
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
    if(params.get("back") && params.get("back") === 'disabled'){
      const pathnameToGo = params.get("pathname");
      if(!pathnameToGo) {
        navigate("/", { replace: true });
        return;
      }
      navigate(pathnameToGo, { replace: true });
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
