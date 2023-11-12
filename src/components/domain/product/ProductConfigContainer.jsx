import OptionContainer from "#/components/domain/product/OptionContainer";
import Box from "@mui/material/Box";

function ProductConfigContainer({ options }) {
  return (
    <Box className="flex flex-col gap-12 mt-4">
      {options?.map((option) => {
        return (
          <OptionContainer
            key={option?._id}
            label={option?.label}
            options={option?.options}
          />
        );
      })}
    </Box>
  );
}

export default ProductConfigContainer;
