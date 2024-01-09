import CartIconSvg from "#/assets/icons/cart.svg";
import { motion } from "framer-motion";

function CartIcon({ ...props }) {
  return (
    <motion.img
      src={CartIconSvg}
      alt="add"
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

export default CartIcon;
