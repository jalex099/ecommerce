import { motion } from "framer-motion";

const NewChipComponent = () => (
  <motion.span
    className="flex justify-center items-center px-3 py-1 w-[80px] rounded"
    style={{
      backgroundColor: "var(--highlight-bg)",
      color: "var(--highlight-text-color)",
    }}
  >
    <span className="font-black text-sm">NUEVO</span>
  </motion.span>
);

export default NewChipComponent;
