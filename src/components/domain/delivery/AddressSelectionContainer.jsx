import ClientAddressService from "#/services/ClientAddressService.js";
import AddressCard from "#/components/domain/delivery/AddressCard.jsx";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const AddressSelectionContainer = ({ addresses, selected, handleSelection }) => {
  return (
    <Box className="flex flex-col gap-2 ">
      <Regular16>Escoge una de tus direcciones</Regular16>
      <Stack spacing={2}>
        {addresses?.length > 0 &&
          addresses?.map((address) => (
            <AddressCard
              key={address?._id}
              address={address}
              isSelected={address?._id === selected}
              handleSelection={handleSelection}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default AddressSelectionContainer;
