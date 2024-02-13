import BoxIconSvg from "#/assets/icons/box.svg";
import { motion } from "framer-motion";

function BoxIcon({ ...props }) {
  return (
    <motion.img
      src={BoxIconSvg}
      alt="box"
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

export default BoxIcon;
