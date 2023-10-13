import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";

function OrdersAndMessagesPage() {
  return (
    <Container sx={style.container}>
      <HelmetMeta page="ordersAndMessages" />
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

export default OrdersAndMessagesPage;
