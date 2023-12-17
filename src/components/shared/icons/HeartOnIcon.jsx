import HeartOnIconSvg from "#/assets/icons/heart-on.svg";
import { motion } from "framer-motion";

function HeartOnIcon({ ...props }) {
  return (
    <motion.img
      src={HeartOnIconSvg}
      alt="heart-on"
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

export default HeartOnIcon;
