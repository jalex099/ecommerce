import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import PaymentMethodSelectorContainer
  from "#/components/domain/checkout/PaymentMethodSelectorContainer.jsx";
import CodeDiscountContainer
  from "#/components/domain/checkout/CodeDiscountContainer.jsx";
import HavingTroublesContainer
  from "#/components/shared/HavingTroublesContainer.jsx";

export default function PaymentContainer() {
  return (
    <Box className="flex-1 w-full flex flex-col gap-4">
      <PaymentMethodSelectorContainer/>
      {/*<CodeDiscountContainer/>*/}
      <HavingTroublesContainer situation={"payment"}/>
    </Box>
  );
}
