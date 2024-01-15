import StoreIconSvg from "#/assets/icons/store.svg";
import { motion } from "framer-motion";

function StoreIcon({ ...props }) {
  return (
    <motion.img
      src={StoreIconSvg}
      alt="star"
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

export default StoreIcon;