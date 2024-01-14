import ClientAddressService from "#/services/ClientAddressService.js";
import AddressCard from "#/components/domain/delivery/AddressCard.jsx";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Box from "@mui/material/Box";

const AddressSelectionContainer = ({ selected, handleSelection }) => {
  const { addresses } = ClientAddressService();
  if (addresses?.length === 0) return null;
  return (
    <Box className="flex flex-col gap-2 ">
      <Regular16>Escoge una de tus direcciones</Regular16>
      <HorizontalScroller showScrollbar separate>
        {addresses?.length > 0 &&
          addresses?.map((address) => (
            <AddressCard
              key={address?._id}
              address={address}
              isSelected={address?._id === selected?._id}
              handleSelection={handleSelection}
            />
          ))}
      </HorizontalScroller>
    </Box>
  );
};

export default AddressSelectionContainer;
