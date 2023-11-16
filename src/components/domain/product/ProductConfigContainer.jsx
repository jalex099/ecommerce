import OptionContainer from "#/components/domain/product/OptionContainer";
import Box from "@mui/material/Box";

function ProductConfigContainer({ options }) {
  return (
    <Box
      className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4"
      sx={style.container}
    >
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

const style = {
  container: {},
};

export default ProductConfigContainer;
