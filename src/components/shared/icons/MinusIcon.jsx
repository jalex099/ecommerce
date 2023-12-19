import MinusIconSvg from "#/assets/icons/minus.svg";
import { motion } from "framer-motion";

function MinusIcon({ ...props }) {
  return (
    <motion.img
      src={MinusIconSvg}
      alt="minus"
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

export default MinusIcon;
