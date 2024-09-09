import Button from "@mui/material/Button";

const ContinueButton = ({ disabled, handleClick }) => (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    disabled={disabled}
    onClick={handleClick}
  >
    Continuar
  </Button>
);

export default ContinueButton;
