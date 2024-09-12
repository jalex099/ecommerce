import MasterCardIconSvg from "#/assets/icons/mastercard.svg";
import { motion } from "framer-motion";

function MasterCardIcon({ ...props }) {
  return (
    <motion.img
      src={MasterCardIconSvg}
      alt="mastercard"
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

export default MasterCardIcon;
