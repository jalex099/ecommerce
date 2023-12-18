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

function CartItem({
  _id,
  index,
  name,
  basePrice,
  aditionalPrice,
  options,
  getDetails,
  onRemoveItem,
  isLastItem,
}) {
  const { findImage } = ImageService();

  const optionsSelectedDetails = useMemo(() => {
    return getDetails(_id, options);
  }, [_id, options]);

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

          <CartItemCounterContainer />
        </Box>

        <Regular16>{formatCurrency(basePrice + aditionalPrice)}</Regular16>
        {/* <CartDeleteItemButton onClick={() => onRemoveItem(_id, index)} /> */}
      </motion.li>
      {!isLastItem && <Divider />}
    </>
  );
}

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

export default CartItem;
