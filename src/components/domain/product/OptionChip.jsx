import Regular14 from "#/components/shared/fonts/Regular14";
import { motion } from "framer-motion";
import { formatCurrency } from "#/utils/currency";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Box from "@mui/material/Box";
import CheckSquareIcon from "#/components/shared/icons/CheckSquareIcon";

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
      className={`text-sm rounded-md flex flex-row items-center justify-between gap-3 p-4 ${
        isSelected ? "_primary-bg " : ""
      }`}
      style={style.content}
      onClick={() => onSelect(option?._id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box>
        <Regular14>{option?.option?.name}</Regular14>
        {option?.aditionalPrice > 0 && (
          <SemiBold14> +{formatCurrency(option?.aditionalPrice)}</SemiBold14>
        )}
      </Box>

      {isSelected && <CheckSquareIcon className="w-5 rounded-2xl" />}
    </motion.div>
  );
}

export default OptionChip;
