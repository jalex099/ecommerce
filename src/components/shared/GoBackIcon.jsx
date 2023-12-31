import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { useCheckoutState } from "#/stores/CheckoutState.js";

function GoBackIcon({ styles = {}, containerStyle = {} }) {
  const checkoutState = useCheckoutState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClick = () => {
    if (pathname === "/pago" && checkoutState?.activeStep !== 0) {
      checkoutState?.handlePreviousStep();
      return;
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
