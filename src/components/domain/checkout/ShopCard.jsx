import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Radio from "@mui/material/Radio";
import Regular14 from "#/components/shared/fonts/Regular14";
import Regular12 from "#/components/shared/fonts/Regular12";

const ShopCard = ({ shop, isSelected, handleSelection }) => {
  const handleChange = () => {
    handleSelection({
      shop: shop?._id,
    });
  };
  return (
    <Box
      className="w-full p-2 rounded-md cursor-pointer flex flex-row justify-between gap-2"
      sx={{
        bgcolor: isSelected ? "primary10.main" : "neutral5.main",
      }}
    >
      <Box className="flex flex-col gap-2 flex-1">
        <Box>
          <SemiBold14>{shop?.name}</SemiBold14>
          <Regular14>{shop?.city}</Regular14>
        </Box>
        {shop?.description && shop?.description.length > 0 && (
          <Regular12
            styles={{ color: (theme) => theme.palette.opacity60.main }}
          >
            {shop?.description}
          </Regular12>
        )}
      </Box>
      <Radio
        checked={isSelected}
        onChange={handleChange}
        value={shop?._id}
        name="shop"
        inputProps={{ "aria-label": "shop" }}
        size="small"
      />
    </Box>
  );
};

export default ShopCard;
