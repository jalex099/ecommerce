import Box from "@mui/material/Box";
import ClientAddressService from "#/services/ClientAddressService";
import AddressCard from "#/components/domain/checkout/AddressCard";

const AddressSelectionContainer = ({ selected, handleSelection }) => {
  const { addresses } = ClientAddressService();
  if (addresses?.length === 0) return null;
  return (
    <Box className="grid grid-cols-2 gap-2">
      {addresses?.length > 0 &&
        addresses?.map((address) => (
          <AddressCard
            key={address?._id}
            address={address}
            isSelected={address?._id === selected?._id}
            handleSelection={handleSelection}
          />
        ))}
    </Box>
  );
};

export default AddressSelectionContainer;
