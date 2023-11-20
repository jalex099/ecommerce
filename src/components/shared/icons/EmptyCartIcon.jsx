import EmptyCartIconSvg from "#/assets/icons/empty-cart.svg";
import { motion } from "framer-motion";

function EmptyCartIcon({ ...props }) {
  return (
    <motion.img
      src={EmptyCartIconSvg}
      alt="empty-cart"
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

export default EmptyCartIcon;
