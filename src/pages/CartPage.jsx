import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";

function CartPage() {
  return (
    <Container sx={style.container}>
      <HelmetMeta page="cart" />
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
  },
};

export default CartPage;
