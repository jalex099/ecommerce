import Button from "@mui/material/Button";
import { formatCurrency } from "#/utils/currency";
import { useNavigate } from "react-router-dom";

function CartCheckoutButton({ total = null }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/pago");
  };
  return (
    <Button
      variant="contained"
      color="primary"
      className="flex gap-2 w-full lg:w-[400px]"
      sx={{ margin: "auto" }}
      onClick={handleClick}
    >
      <span>Ir a pagar</span>
      {total !== null && <span>{formatCurrency(total)}</span>}
    </Button>
  );
}

export default CartCheckoutButton;
