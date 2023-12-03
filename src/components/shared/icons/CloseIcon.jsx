import CloseIconSvg from "#/assets/icons/close.svg";
import { motion } from "framer-motion";

function CloseIcon({ ...props }) {
  return (
    <motion.img
      src={CloseIconSvg}
      alt="close"
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

export default CloseIcon;
