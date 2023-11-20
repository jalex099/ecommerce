import { motion } from "framer-motion";
import CartItem from "#/components/domain/cart/CartItem";
import Container from "@mui/material/Container";

function CartItemsContainer({ products }) {
  return (
    <Container className="w-full container">
      <motion.ul variants={variants} className="flex flex-col gap-4 w-full">
        {products.map((product, index) => {
          return (
            <CartItem
              key={product?._id + product?.name + index}
              _id={product?._id}
              name={product?.name}
              price={product?.price}
              options={product?.options}
            />
          );
        })}
      </motion.ul>
    </Container>
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
