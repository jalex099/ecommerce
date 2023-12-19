import Button from "@mui/material/Button";
import { formatCurrency } from "#/utils/currency";

function CartCheckoutButton({ total = null }) {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className="flex gap-2"
    >
      <span>Ir a pagar</span>
      {total !== null && <span>{formatCurrency(total)}</span>}
    </Button>
  );
}

export default CartCheckoutButton;
