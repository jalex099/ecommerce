import TrashIconSvg from "#/assets/icons/trash.svg";
import { motion } from "framer-motion";

function TrashIcon({ ...props }) {
  return (
    <motion.img
      src={TrashIconSvg}
      alt="trash"
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

export default TrashIcon;
