/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import SemiBold16 from "#/components/shared/fonts/SemiBold16";
import Picture from "#/components/shared/Picture";
import ImageService from "#/services/ImageService.js";
import CartDeleteItemButton from "#/components/domain/cart/CartDeleteItemButton";
import { formatCurrency } from "#/utils/currency";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import { useMemo } from "react";
import Regular12 from "#/components/shared/fonts/Regular12";
import Divider from "@mui/material/Divider";
import Regular14 from "#/components/shared/fonts/Regular14";
import Button from "@mui/material/Button";

function CartItem({
  _id,
  index,
  name,
  basePrice,
  aditionalPrice,
  options,
  getDetails,
  onRemoveItem,
}) {
  const { findImage } = ImageService();

  const optionsSelectedDetails = useMemo(() => {
    return getDetails(_id, options);
  }, [_id, options]);

  return (
    <motion.li
      layout
      variants={item}
      className="w-full min-h-[220px] flex flex-col gap-6 justify-start items-start p-5 rounded-md relative bg-white _shadow"
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
        <Box>
          <SemiBold16>{name}</SemiBold16>
          <Regular14>x1</Regular14>
        </Box>
      </Box>
      <Box className="flex flex-row justify-between items-center w-full">
        <Box className="flex-1 flex flex-row flex-wrap gap-1 opacity-80">
          {optionsSelectedDetails?.map(({ name }, index) => {
            return (
              <>
                <Regular12 key={index}>{name}</Regular12>
                {index !== optionsSelectedDetails.length - 1 && (
                  <Divider orientation="vertical" flexItem />
                )}
              </>
            );
          })}
        </Box>
        <Box className="flex flex-row gap-1">
          <SemiBold14>{formatCurrency(basePrice + aditionalPrice)}</SemiBold14>
        </Box>
      </Box>
      <Box className="w-full grid grid-cols-2 gap-2">
        <Button variant="outlined" color="primary" aria-label="Editar">
          Editar
        </Button>
        <Button variant="outlined" color="primary" aria-label="Editar">
          Archivar
        </Button>
      </Box>

      <CartDeleteItemButton onClick={() => onRemoveItem(_id, index)} />
    </motion.li>
  );
}

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

export default CartItem;
