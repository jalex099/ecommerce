import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import SemiBold16 from "#/components/shared/fonts/SemiBold16";

const AddressCard = ({ address, isSelected, handleSelection }) => {
  const handleClick = () => {
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
      className="w-full  flex flex-col gap-2 shadow-md p-4 rounded-md min-w-[180px] h-[120px]"
      sx={{
        bgcolor: (theme) =>
          isSelected
            ? theme.palette.secondary10.main
            : theme.palette.background.default,
      }}
      onClick={handleClick}
    >
      <SemiBold16>{address?.name}</SemiBold16>
      <Box>
        <Regular12>
          {address?.street}. #{address?.houseNumber}
        </Regular12>
        <Regular12>{address?.reference}</Regular12>
      </Box>
    </Box>
  );
};

export default AddressCard;
