import CartWhiteIconSvg from "#/assets/icons/cart-white.svg";
import { motion } from "framer-motion";

function CartWhiteIcon({ ...props }) {
  return (
    <motion.img
      src={CartWhiteIconSvg}
      alt="cart"
      {...props}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

export default CartWhiteIcon;
