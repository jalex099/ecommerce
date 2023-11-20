import { motion } from "framer-motion";
import CartCheckoutButton from "#/components/domain/cart/CartCheckoutButton";
import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import { formatCurrency } from "#/utils/currency";
import Divider from "@mui/material/Divider";

function CartResumeInfo({ subtotal = 0, discount = 0, total = 0 }) {
  return (
    <motion.div
      className="sticky bottom-0 left-0 right-0 z-10 p-6 flex flex-col gap-4 w-full"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box className="flex flex-col gap-1">
        {discount > 0 && subtotal !== total && (
          <>
            <Box className="flex flex-row justify-between items-center">
              <Regular14>Subtotal</Regular14>
              <Regular14>{formatCurrency(subtotal)}</Regular14>
            </Box>
            <Box className="flex flex-row justify-between items-center">
              <Regular14>Descuento</Regular14>
              <Regular14>{formatCurrency(discount)}</Regular14>
            </Box>
            <Divider />
          </>
        )}

        <Box className="flex flex-row justify-between items-center">
          <Regular14>Total</Regular14>
          <Regular14>{formatCurrency(total)}</Regular14>
        </Box>
      </Box>
      <CartCheckoutButton />
    </motion.div>
  );
}

export default CartResumeInfo;
