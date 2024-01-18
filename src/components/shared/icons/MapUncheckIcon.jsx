import MapUncheckSvg from "#/assets/icons/map-uncheck.svg";
import { motion } from "framer-motion";

function MapUncheck({ ...props }) {
  return (
    <motion.img
      src={MapUncheckSvg}
      alt="map-uncheck"
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

export default MapUncheck;
