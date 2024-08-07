import OptionContainer from "#/components/domain/product/OptionContainer";
import Box from "@mui/material/Box";

function ProductConfigContainer({ options }) {
  return (
    <Box
      className={`${
        options?.length === 1
          ? "flex justify-center items-center "
          : "grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4"
      }`}
      sx={style.container}
    >
      {options?.map((option, index) => {
        return (
          <OptionContainer
            key={option?.label + index}
            className={`${
              options?.length === 1 ? "min-w-1/2 w-1/2 max-w-1/2" : ""
            }`}
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
