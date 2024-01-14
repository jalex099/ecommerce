import DeliveryIconSvg from "#/assets/icons/delivery.svg";
import { motion } from "framer-motion";

function DeliveryIcon({ ...props }) {
  return (
    <motion.img
      src={DeliveryIconSvg}
      alt="delivery"
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

export default DeliveryIcon;