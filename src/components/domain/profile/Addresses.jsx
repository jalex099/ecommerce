import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Address from "#/components/domain/profile/Address";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import BadgePrimary from "#/components/shared/BadgePrimary";
import AddressSkeleton from "#/components/domain/profile/skeletons/AddressSkeleton";
import Link from "@mui/material/Link";

function Addresses({ items = [], isLoading }) {
  const navigate = useNavigate();

  const handleAddAddress = () => {
    navigate("/profile/add-address");
  };
  if (isLoading) return <AddressSkeleton />;
  return (
    <Box sx={style.container}>
      <Regular18>Mis direcciones</Regular18>
      <Box sx={style.subcontainer}>
        {items?.length === 0 && (
          <BadgePrimary>
            Aún no tienes direcciones registradas <br />
            <Link
              onClick={handleAddAddress}
              sx={{ color: (theme) => theme.palette.neutral80.main }}
            >
              ¡Agrega una ahora!
            </Link>
          </BadgePrimary>
        )}
        {items?.length > 0 && (
          <>
            {items?.map((address) => (
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
            <Button
              variant="outlined"
              sx={{ width: "100%", maxWidth: "400px" }}
              onClick={handleAddAddress}
            >
              Agregar dirección
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
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
