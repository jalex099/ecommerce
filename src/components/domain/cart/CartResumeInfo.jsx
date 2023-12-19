import { motion } from "framer-motion";
import CartCheckoutButton from "#/components/domain/cart/CartCheckoutButton";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import { formatCurrency } from "#/utils/currency";
import Divider from "@mui/material/Divider";
import Bold16 from "#/components/shared/fonts/Bold16";

function CartResumeInfo({ subtotal = 0, discount = 0, total = 0 }) {
  return (
    <motion.div
      className="sticky bottom-0 left-0 right-0 z-10 p-6 flex flex-col gap-4 w-full"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "#F3F3F3",
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box className="flex flex-col gap-1">
        {discount > 0 && subtotal !== total && (
          <>
            <Box className="flex flex-row justify-between items-center">
              <Regular16>Subtotal</Regular16>
              <Regular16>{formatCurrency(subtotal)}</Regular16>
            </Box>
            <Box className="flex flex-row justify-between items-center">
              <Regular16>Descuento</Regular16>
              <Regular16>{formatCurrency(discount)}</Regular16>
            </Box>
            <Divider />
          </>
        )}
        <Box className="flex flex-row justify-between items-center">
          <Regular16>Total</Regular16>
          <Bold16>{formatCurrency(total)}</Bold16>
        </Box>
      </Box>
      <CartCheckoutButton />
    </motion.div>
  );
}

export default CartResumeInfo;
