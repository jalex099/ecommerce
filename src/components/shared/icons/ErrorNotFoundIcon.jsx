import ErrorNotFoundSvg from "#/assets/icons/error-not-found.svg";
import { motion } from "framer-motion";

function ErrorNotFound({ ...props }) {
  return (
    <motion.img
      src={ErrorNotFoundSvg}
      alt="error"
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

export default ErrorNotFound;
