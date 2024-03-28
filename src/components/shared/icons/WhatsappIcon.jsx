import WhatsappIconSvg from "#/assets/icons/whatsapp.svg";
import { motion } from "framer-motion";

function WhatsappIcon({ ...props }) {
  return (
    <motion.img
      src={WhatsappIconSvg}
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

export default WhatsappIcon;
