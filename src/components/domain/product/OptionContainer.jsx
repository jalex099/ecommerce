import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import OptionCard from "#/components/domain/product/OptionCard";
import HorizontalScroller from "#/components/shared/HorizontalScroller";

function OptionContainer({ label, options }) {
  return (
    <Box className="flex flex-col">
      <Regular16 className="px-4 py-0">{label}</Regular16>
      <HorizontalScroller>
        {options?.map((opt) => {
          return <OptionCard key={opt?._id} option={opt} />;
        })}
      </HorizontalScroller>
    </Box>
  );
}

export default OptionContainer;
