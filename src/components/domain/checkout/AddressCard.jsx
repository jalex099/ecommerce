import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import Radio from "@mui/material/Radio";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";

const AddressCard = ({ address, isSelected, handleSelection }) => {
  const handleChange = () => {
    const data = {
      lngLat: {
        lat: address?.latitude,
        lng: address?.longitude,
      },
      address: address,
    };
    handleSelection(data);
  };
  return (
    <Box
      className="w-full  flex flex-row gap-0 shadow-sm p-2 rounded-md min-w-[180px] min-h-[60px]"
      sx={{
        backgroundColor: (theme) =>
          isSelected
            ? theme.palette.primary10.main
            : theme.palette.neutral5.main,
      }}
      onClick={handleChange}
    >
      <Box className="flex flex-col">
        <SemiBold14>{address?.name}</SemiBold14>
        <Regular12 className="overflow-ellipsis overflow-hidden w max-w-[120px]">
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
