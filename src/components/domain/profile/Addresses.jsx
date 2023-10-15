import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Address from "#/components/domain/profile/Address";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AddressSkeleton from "#/components/domain/profile/skeletons/AddressSkeleton";
import ClientAddressService from "#/services/ClientAddressService";
import NoAddressesContainer from "#/components/domain/profile/NoAddressesContainer";

function Addresses() {
  const { addresses, isLoading, isRefetching } = ClientAddressService();
  const navigate = useNavigate();

  const handleAddAddress = () => {
    navigate("/profile/add-address");
  };
  if (isLoading || isRefetching) return <AddressSkeleton />;
  return (
    <Box sx={style.container}>
      <Regular18>Mis direcciones</Regular18>
      <Box sx={style.subcontainer}>
        {addresses?.length === 0 && (
          <NoAddressesContainer
            AddNewAddressButton={
              <AddNewAddressButton handleClick={handleAddAddress} />
            }
          />
        )}
        {addresses?.length > 0 && (
          <>
            {addresses?.map((address) => (
              <Address
                key={address?._id}
                latitute={address?.latitute}
                longitude={address?.longitude}
                street={address?.street}
                zone={address?.zone}
                name={address?.name}
                reference={address?.reference}
              />
            ))}
            <AddNewAddressButton handleClick={handleAddAddress} />
          </>
        )}
      </Box>
    </Box>
  );
}

const AddNewAddressButton = ({ handleClick }) => (
  <Button
    variant="outlined"
    sx={{ width: "100%", maxWidth: "400px" }}
    onClick={handleClick}
  >
    Agregar dirección
  </Button>
);

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
  },
  subcontainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "24px",
  },
};
export default Addresses;
