import MapCheckSvg from "#/assets/icons/map-check.svg";
import { motion } from "framer-motion";

function MapCheck({ ...props }) {
  return (
    <motion.img
      src={MapCheckSvg}
      alt="map-check"
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

export default MapCheck;
