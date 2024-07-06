import ArrowRightIconSvg from "#/assets/icons/arrow-right.svg";
import { motion } from "framer-motion";

function ArrowRightIcon({ ...props }) {
  return (
    <motion.img
      src={ArrowRightIconSvg}
      alt="add"
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

export default ArrowRightIcon;
