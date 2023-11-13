import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";

function OptionChip({ option, isSelected, onSelect }) {
  const style = {
    content: {
      textWrap: "balance",
      border: (theme) =>
        `2px ${isSelected ? "solid" : "dashed"} ${
          theme.palette.neutral40.main
        }`,
      wordWrap: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "nowrap",
      textOverflow: "auto",
    },
  };
  return (
    <Box
      className={`text-sm rounded-md  block  px-3 py-1 ${
        isSelected && "shadow-md"
      }`}
      sx={style.content}
      onClick={() => onSelect(option?._id)}
    >
      <Regular14 className="w-full">{option?.option?.name}</Regular14>
    </Box>
  );
}

export default OptionChip;
