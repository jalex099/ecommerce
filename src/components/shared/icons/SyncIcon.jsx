import SyncIconSvg from "#/assets/icons/sync.svg";
import { motion } from "framer-motion";

function SyncIcon({ ...props }) {
  return (
    <motion.img
      src={SyncIconSvg}
      alt="add"
      {...props}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

export default SyncIcon;
