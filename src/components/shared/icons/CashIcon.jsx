import CashIconSvg from "#/assets/icons/cash.svg";
import { motion } from "framer-motion";

function CashIcon({ ...props }) {
  return (
    <motion.img
      src={CashIconSvg}
      alt="cash"
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

export default CashIcon;
