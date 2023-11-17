import BookmarkOffIconSvg from "#/assets/icons/bookmark-off.svg";
import { motion } from "framer-motion";

function BookmarkOffIcon({ className, ...props }) {
  return (
    <motion.img
      src={BookmarkOffIconSvg}
      alt="bookmark-off"
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

export default BookmarkOffIcon;
