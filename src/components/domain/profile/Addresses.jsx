import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Address from "#/components/domain/profile/Address";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const addresses = [
  {
    name: "Casa",
    address: "Urb. Ciudad Real, Pasaje 9 #123",
    reference: "Cerca de la escuela",
  },
  {
    name: "Trabajo",
    address: "Boulevard Merliot, Edificio 123, Local 1-A",
    reference: "Al lado del parqueo general",
  },
];

function Addresses() {
  const navigate = useNavigate();

  const handleAddAddress = () => {
    navigate("/profile/add-address");
  };
  return (
    <Box sx={style.container}>
      <Regular18>Mis direcciones</Regular18>
      <Box sx={style.subcontainer}>
        {addresses?.map(({ name, address, reference }) => (
          <Address
            key={name}
            address={address}
            name={name}
            reference={reference}
          />
        ))}
        <Button
          variant="outlined"
          sx={{ width: "100%", maxWidth: "400px" }}
          onClick={handleAddAddress}
        >
          Agregar dirección
        </Button>
      </Box>
    </Box>
  );
}
const style = {
  container: {
    padding: "0 24px",
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
