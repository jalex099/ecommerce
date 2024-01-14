import BuildingIconSvg from "#/assets/icons/building.svg";
import { motion } from "framer-motion";

function BuildingIcon({ ...props }) {
  return (
    <motion.img
      src={BuildingIconSvg}
      alt="pickup"
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

export default BuildingIcon;