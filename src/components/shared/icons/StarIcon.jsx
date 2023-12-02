import StarIconSvg from "#/assets/icons/star.svg";
import { motion } from "framer-motion";

function StarIcon({ ...props }) {
  return (
    <motion.img
      src={StarIconSvg}
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

export default StarIcon;
