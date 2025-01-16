import { motion } from "framer-motion";
import CartItem from "#/components/domain/cart/CartItem";
import Container from "@mui/material/Container";

function CartItemsContainer({ products, getDetails }) {
  return (
    <Container className="w-full container flex-grow">
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full "
      >
        {products?.length > 0 &&
          products?.map((product, index) => {
            return (
              <CartItem
                key={product?.idprs + product?.orden || "0" + index}
                index={index}
                _id={product?.idprs}
                name={product?.name}
                nonOfferPrice={product?.nonOfferPrice}
                basePrice={product?.basePrice}
                quantity={product?.quantity}
                aditionalPrice={product?.additionalPrice}
                options={product?.options}
                discount={product?.discount}
                getDetails={getDetails}
                isLastItem={index === products?.length - 1}
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
