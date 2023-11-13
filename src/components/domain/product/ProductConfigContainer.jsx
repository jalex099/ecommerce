import OptionContainer from "#/components/domain/product/OptionContainer";
import Box from "@mui/material/Box";

function ProductConfigContainer({ options }) {
  return (
    <Box className="flex flex-col gap-8">
      {options?.map((option, index) => {
        return (
          <OptionContainer
            key={option?._id + index}
            label={option?.label}
            options={option?.options}
            index={index}
          />
        );
      })}
    </Box>
  );
}

export default ProductConfigContainer;
