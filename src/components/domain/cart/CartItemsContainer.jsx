import { motion } from "framer-motion";
import CartItem from "#/components/domain/cart/CartItem";
import Container from "@mui/material/Container";

function CartItemsContainer({ products, getDetails, onRemoveItem }) {
  return (
    <Container className="w-full container flex-grow">
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 w-full "
      >
        {products?.length > 0 &&
          products?.map((product, index) => {
            return (
              <CartItem
                key={product?._id + product?.orden || "0" + index}
                index={index}
                _id={product?._id}
                name={product?.name}
                basePrice={product?.basePrice}
                aditionalPrice={product?.aditionalPrice}
                options={product?.options}
                getDetails={getDetails}
                onRemoveItem={onRemoveItem}
              />
            );
          })}
      </motion.ul>
    </Container>
  );
}
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default CartItemsContainer;
