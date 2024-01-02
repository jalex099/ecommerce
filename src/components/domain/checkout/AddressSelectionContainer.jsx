import Box from "@mui/material/Box";
import ClientAddressService from "#/services/ClientAddressService";
import AddressCard from "#/components/domain/checkout/AddressCard";
import HorizontalScroller from "#/components/shared/HorizontalScroller";

const AddressSelectionContainer = ({ selected, handleSelection }) => {
  const { addresses } = ClientAddressService();
  if (addresses?.length === 0) return null;
  return (
    <HorizontalScroller>
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
  );
};

export default AddressSelectionContainer;
