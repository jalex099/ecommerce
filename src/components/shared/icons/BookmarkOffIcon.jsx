import BookmarkOffIconSvg from "#/assets/icons/bookmark-off.svg";
import { motion } from "framer-motion";

function BookmarkOffIcon({ ...props }) {
  return (
    <motion.img
      src={BookmarkOffIconSvg}
      alt="bookmark-off"
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

export default BookmarkOffIcon;
