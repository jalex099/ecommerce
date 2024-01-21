import BankIconSvg from "#/assets/icons/bank.svg";
import { motion } from "framer-motion";

function BankIcon({ ...props }) {
  return (
    <motion.img
      src={BankIconSvg}
      alt="bank"
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

export default BankIcon;
