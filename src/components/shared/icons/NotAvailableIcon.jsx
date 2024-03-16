import NotAvailableIconSvg from "#/assets/icons/not-available.svg";
import { motion } from "framer-motion";

function NotAvailableIcon({ ...props }) {
  return (
    <motion.img
      src={NotAvailableIconSvg}
      alt="not-available"
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

export default NotAvailableIcon;