import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { useCartState } from "#/stores/cart";
import { useMemo } from "react";

export default function GoToCartTopBarButton() {
  const navigate = useNavigate();

  const cart = useCartState();

  const handleClickGoToCart = () => {
    navigate("/carrito");
  };
  const badgeContent = useMemo(() => {
    return cart?.getItemsCounter() || 0;
  }, [cart?.getItemsCounter()]);
  return (
    <IconButton
      aria-label="cart"
      variant="contained"
      className="w-8 h-8"
      onClick={handleClickGoToCart}
    >
      <Badge badgeContent={badgeContent} color="secondary" variant="dot">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
