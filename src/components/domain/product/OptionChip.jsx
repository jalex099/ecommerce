import Regular14 from "#/components/shared/fonts/Regular14";
import { motion } from "framer-motion";
import { formatCurrency } from "#/utils/currency";

function OptionChip({ option, isSelected, onSelect }) {
  const style = {
    content: {
      textWrap: "balance",
      border: (theme) =>
        `2px ${isSelected ? "solid" : "dashed"} ${
          theme.palette.neutral40.main
        }`,
      // wordWrap: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "nowrap",
      textOverflow: "auto",
    },
  };
  return (
    <motion.div
      className={`text-sm rounded-md  block  px-3 py-1 border-2  ${
        isSelected ? "shadow-md border-gray-400 " : "border-dashed "
      }`}
      style={style.content}
      onClick={() => onSelect(option?._id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Regular14 className="w-full">{option?.option?.name}</Regular14>
      {option?.aditionalPrice > 0 && (
        <Regular14 className="w-full text-right">
          {formatCurrency(option?.aditionalPrice)}
        </Regular14>
      )}
    </motion.div>
  );
}

export default OptionChip;
