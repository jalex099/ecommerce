import Button from "@mui/material/Button";

const ConfirmPaymentButton = ({ disabled, handleClick }) => (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    disabled={disabled}
    onClick={handleClick}
  >
    Confirmar y pagar
  </Button>
);

export default ConfirmPaymentButton;
