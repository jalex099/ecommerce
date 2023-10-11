import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import AddAddressContainer from "#/components/domain/profile/addAddress/AddAddressContainer";

function AddAddressPage() {
  return (
    <Container sx={style.container}>
      <HelmetMeta page="addAddress" />
      <AddAddressContainer />
    </Container>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "16px 24px",
  },
  divider: {
    width: "100%",
  },
};

export default AddAddressPage;
