import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import PaymentMethodSelectorContainer
  from "#/components/domain/checkout/PaymentMethodSelectorContainer.jsx";

export default function PaymentContainer() {
  return (
    <Box className="flex-1 w-full flex flex-col gap-4">
      <Regular16>Selecciona un método de pago</Regular16>
      <PaymentMethodSelectorContainer/>
    </Box>
  );
}
