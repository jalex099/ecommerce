import { motion } from "framer-motion";
import CartItemCard from "#/components/domain/cart/CartItemCard";
import Box from "@mui/material/Box";

function CartItemsContainer({ products }) {
  return (
    <Box className="w-full">
      <motion.ul variants={variants} className="flex flex-col gap-4 w-full">
        {products.map((product, index) => {
          return (
            <CartItemCard
              key={index}
              _id={product?._id}
              name={product?.name}
              price={product?.price}
              options={product?.options}
            />
          );
        })}
      </motion.ul>
    </Box>
  );
}

const variants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

export default CartItemsContainer;
