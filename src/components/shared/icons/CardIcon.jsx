import CardIconSvg from "#/assets/icons/card.svg";
import { motion } from "framer-motion";

function CardIcon({ ...props }) {
  return (
    <motion.img
      src={CardIconSvg}
      alt="card"
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

export default CardIcon;
