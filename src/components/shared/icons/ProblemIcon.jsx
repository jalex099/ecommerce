import ProblemIconSvg from "#/assets/icons/problem.svg";
import { motion } from "framer-motion";

function ProblemIcon({ ...props }) {
  return (
    <motion.img
      src={ProblemIconSvg}
      alt="problem"
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

export default ProblemIcon;
