import GmailIconSvg from "#/assets/icons/gmail.svg";
import { motion } from "framer-motion";

function GmailIcon({ ...props }) {
  return (
    <motion.img
      src={GmailIconSvg}
      alt="whatsapp"
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

export default GmailIcon;
