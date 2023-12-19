/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import SemiBold16 from "#/components/shared/fonts/SemiBold16";
import Picture from "#/components/shared/Picture";
import ImageService from "#/services/ImageService.js";
import { formatCurrency } from "#/utils/currency";
import { useMemo } from "react";
import Regular12 from "#/components/shared/fonts/Regular12";
import Divider from "@mui/material/Divider";
import Regular16 from "#/components/shared/fonts/Regular16";
import CartItemCounterContainer from "#/components/domain/cart/CartItemCounterContainer";
import SemiBold12 from "#/components/shared/fonts/SemiBold12";

function CartItem({
  _id,
  index,
  name,
  basePrice,
  aditionalPrice,
  quantity,
  options,
  getDetails,
  isLastItem,
}) {
  const { findImage } = ImageService();

  const optionsSelectedDetails = useMemo(() => {
    return getDetails(_id, options);
  }, [_id, options]);

  const subtotal = useMemo(() => {
    return (basePrice + aditionalPrice) * quantity;
  }, [basePrice, aditionalPrice, quantity]);

  const individualPrice = useMemo(() => {
    return basePrice + aditionalPrice;
  }, [basePrice, aditionalPrice]);

  return (
    <>
      <motion.li
        layout
        variants={item}
        className="w-full min-h-[96px] flex flex-row gap-3 justify-start items-start"
      >
        <Box className="flex w-24 rounded-md overflow-hidden">
          <Picture
            webp={findImage(_id, "PRD", "webp")}
            jpg={findImage(_id, "PRD", "jpg")}
            alt={`Imagen de ${name}`}
            className="h-full aspect-square object-cover "
          />
        </Box>
        <Box className="flex-1 flex justify-between flex-col gap-2 ">
          <Box className="flex flex-col">
            <SemiBold16>{name}</SemiBold16>
            <Regular12 className="opacity-80">
              {optionsSelectedDetails?.map(({ name }, index) => {
                return index !== optionsSelectedDetails.length - 1
                  ? `${name} / `
                  : name;
              })}
            </Regular12>
          </Box>

          <CartItemCounterContainer
            _id={_id}
            index={index}
            quantity={quantity}
          />
        </Box>

        <Regular16>{formatCurrency(individualPrice)}</Regular16>
      </motion.li>
      {!!subtotal && (
        <Box className="w-full flex justify-center items-center gap-2">
          <Regular12>Subtotal </Regular12>
          <motion.div
            key={subtotal}
            variants={variants}
            animate="show"
            initial="hide"
          >
            <SemiBold12>{formatCurrency(subtotal)}</SemiBold12>
          </motion.div>
        </Box>
      )}

      {!isLastItem && <Divider />}
    </>
  );
}

const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
  hide: {
    y: 4,
    opacity: 0,
  },
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

export default CartItem;
