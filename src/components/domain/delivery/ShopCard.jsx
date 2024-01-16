import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Radio from "@mui/material/Radio";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const ShopCard = ({ shop, isSelected, handleSelection }) => {
  const handleChange = () => {
    handleSelection(shop);
  };
  return (
    <Box
      className="w-full  flex flex-row gap-2 py-2 px-4 rounded-md min-w-[180px] min-h-[60px]"
      sx={{
        color: (theme) =>
          isSelected
            ? theme.palette.primary140.main
            : theme.palette.neutral70.main,
        bgcolor: (theme) =>
          isSelected
            ? theme.palette.primary10.main
            : theme.palette.neutral0.main,
      }}
      onClick={handleChange}
    >
      <Box className="flex flex-col gap-2 flex-1">
        <Box>
          <SemiBold14>{shop?.name} / {shop?.city}</SemiBold14>
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
