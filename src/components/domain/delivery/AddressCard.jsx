import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Radio from "@mui/material/Radio";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";

const AddressCard = ({ address, isSelected, handleSelection }) => {
  const handleChange = () => {
    handleSelection(address);
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
      <Box className="flex flex-col w-full">
        <SemiBold14>{address?.name}</SemiBold14>
        <Regular12 className="w-full">
          {address?.street}. #{address?.houseNumber}
        </Regular12>
      </Box>
      <Radio
        checked={isSelected}
        onChange={handleChange}
        value={address?._id}
        name="shipping-address"
        inputProps={{ "aria-label": "shipping address" }}
        size="small"
      />
    </Box>
  );
};

export default AddressCard;
