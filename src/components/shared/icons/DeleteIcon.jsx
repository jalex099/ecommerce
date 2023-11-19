import DeleteIconSvg from "#/assets/icons/delete.svg";
import { motion } from "framer-motion";

function DeleteIcon({ ...props }) {
  return (
    <motion.img
      src={DeleteIconSvg}
      alt="delete"
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

export default DeleteIcon;
