import VisaWhiteIconSvg from "#/assets/icons/visa-white.svg";
import { motion } from "framer-motion";

function VisaWhiteIcon({ ...props }) {
  return (
    <motion.img
      src={VisaWhiteIconSvg}
      alt="visaWhite"
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

export default VisaWhiteIcon;
