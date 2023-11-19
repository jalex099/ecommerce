/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import Regular16 from "#/components/shared/fonts/Regular16";
import Picture from "#/components/shared/Picture";
import ImageService from "#/services/ImageService.js";
import CartDeleteItemButton from "#/components/domain/cart/CartDeleteItemButton";
import { formatCurrency } from "#/utils/currency";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import CartController from "#/components/domain/cart/controllers/CartController";
import { useMemo } from "react";
import Regular12 from "#/components/shared/fonts/Regular12";

function CartItemCard({ _id, name, price, options }) {
  const { findImage } = ImageService();
  const { optionDetails } = CartController();

  const optionsSelectedDetails = useMemo(() => {
    return optionDetails(_id, options);
  }, [_id, options]);

  return (
    <motion.li
      variants={variants}
      className="w-full h-[220px] flex flex-col gap-2 justify-start items-start p-5 rounded-md relative bg-white"
    >
      <Box className="flex flex-row justify-start items-center gap-4 w-full">
        <Box className="w-[92px] aspect-square rounded-md overflow-hidden">
          <Picture
            webp={findImage(_id, "PRD", "webp")}
            jpg={findImage(_id, "PRD", "jpg")}
            alt={`Imagen de ${name}`}
            className="w-4 h-4 object-cover rounded-md"
          />
        </Box>
        <Regular16>{name}</Regular16>
      </Box>
      <Box className="flex flex-row justify-between items-center w-full">
        <Box className="flex-1 flex flex-row flex-wrap gap-1 opacity-80">
          {optionsSelectedDetails?.map(({ name }, index) => {
            return (
              <Regular12 key={index}>
                {name}
                {index < optionsSelectedDetails.length - 1 && ", "}
              </Regular12>
            );
          })}
        </Box>
        <Box>
          <SemiBold14>{formatCurrency(price)}</SemiBold14>
        </Box>
      </Box>

      <CartDeleteItemButton />
    </motion.li>
  );
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      // y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      // y: { stiffness: 1000 },
    },
  },
};

export default CartItemCard;
