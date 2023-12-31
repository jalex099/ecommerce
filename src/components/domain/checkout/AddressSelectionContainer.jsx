import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import ClientAddressService from "#/services/ClientAddressService";

const AddressSelectionContainer = () => {
  const { addresses } = ClientAddressService();
  return (
    <Box classname="flex flex-col gap-2">
      {addresses?.length === 0 && (
        <Regular16>
          No tienes direcciones registradas, ve y registra una
        </Regular16>
      )}
    </Box>
  );
};

export default AddressSelectionContainer;
