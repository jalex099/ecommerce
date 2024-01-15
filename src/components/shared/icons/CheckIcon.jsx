import CheckIconSvg from "#/assets/icons/check.svg";
import { motion } from "framer-motion";

function CheckIcon({ ...props }) {
  return (
    <motion.img
      src={CheckIconSvg}
      alt="check"
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

export default CheckIcon;
