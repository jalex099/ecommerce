import PointOfMapIconSvg from "#/assets/icons/point-on-map.svg";
import { motion } from "framer-motion";

function PointOfMapIcon({ ...props }) {
  return (
    <motion.img
      src={PointOfMapIconSvg}
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

export default PointOfMapIcon;