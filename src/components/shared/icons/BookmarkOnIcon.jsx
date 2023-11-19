import BookmarkOnIconSvg from "#/assets/icons/bookmark-on.svg";
import { motion } from "framer-motion";

function BookmarkOnIcon({ ...props }) {
  return (
    <motion.img
      src={BookmarkOnIconSvg}
      alt="bookmark-on"
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

export default BookmarkOnIcon;
