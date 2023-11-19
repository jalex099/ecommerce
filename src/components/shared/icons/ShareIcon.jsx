import ShareIconSvg from "#/assets/icons/share.svg";
import { motion } from "framer-motion";

function ShareIcon({ ...props }) {
  return (
    <motion.img
      src={ShareIconSvg}
      alt="share"
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

export default ShareIcon;
