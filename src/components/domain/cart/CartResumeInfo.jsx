import { motion } from "framer-motion";
import CartCheckoutButton from "#/components/domain/cart/CartCheckoutButton";
function CartResumeInfo() {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-10 px-6 py-3 flex flex-col gap-2 "
      style={{ backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1>subTotal</h1>

      <CartCheckoutButton />
    </motion.div>
  );
}

export default CartResumeInfo;
