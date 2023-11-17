import BookmarkOnIconSvg from "#/assets/icons/bookmark-on.svg";
import { motion } from "framer-motion";

function BookmarkOnIcon({ className, ...props }) {
  return (
    <motion.img
      src={BookmarkOnIconSvg}
      alt="bookmark-on"
      className={`${className}`}
      {...props}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    />
  );
}

export default BookmarkOnIcon;
