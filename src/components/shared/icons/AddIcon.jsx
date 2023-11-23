import AddIconSvg from "#/assets/icons/add.svg";
import { motion } from "framer-motion";

function AddIcon({ ...props }) {
  return (
    <motion.img
      src={AddIconSvg}
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

export default AddIcon;
