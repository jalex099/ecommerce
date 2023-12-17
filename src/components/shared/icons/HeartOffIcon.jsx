import HeartOffIconSvg from "#/assets/icons/heart-off.svg";
import { motion } from "framer-motion";

function HeartOffIcon({ ...props }) {
  return (
    <motion.img
      src={HeartOffIconSvg}
      alt="heart-off"
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

export default HeartOffIcon;
