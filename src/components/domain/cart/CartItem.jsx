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
import { useHookstate } from "@hookstate/core";

function CartItem({
  _id,
  index,
  name,
  nonOfferPrice,
  basePrice,
  aditionalPrice,
  quantity,
  options,
  discount,
  getDetails,
  isLastItem,
}) {
  const { findImage } = ImageService();
  const isTrashing = useHookstate(false);

  const optionsSelectedDetails = useMemo(() => {
    return getDetails(_id, options);
  }, [_id, options]);

  const subtotal = useMemo(() => {
    return (basePrice + aditionalPrice) * quantity;
  }, [basePrice, aditionalPrice, quantity]);

  const individualPrice = useMemo(() => {
    return basePrice + aditionalPrice;
  }, [basePrice, aditionalPrice]);

  const toogleTrash = () => {
    isTrashing.set(!isTrashing.get());
  }

  const descriptionOptions = useMemo(() => {
    return optionsSelectedDetails?.map(({ name }, index) => {
      return index !== optionsSelectedDetails.length - 1
        ? `${name} - `
        : name;
    });
  }, [optionsSelectedDetails]);

  return (
    <>
      <motion.li
        layout
        variants={item}
        className="w-full flex flex-col gap-4 justify-start items-start"
      >
        <Box className={`w-full min-h-[96px] flex flex-row gap-3 justify-start items-start ${!!isTrashing?.value && 'opacity-50 grayscale'}`}>
          <Box className="flex w-24 rounded-md overflow-hidden">
            <Picture
              webp={findImage(_id, "PRD", "webp")}
              jpg={findImage(_id, "PRD", "jpg")}
              alt={`Imagen de ${name}`}
              className="h-full aspect-square object-cover "
            />
          </Box>
          <Box className="flex-1 flex justify-between flex-col gap-2 ">
            <Box className="flex flex-col lg:max-w-[500px]">
              <SemiBold16>{name}</SemiBold16>
              <Regular12 className={`opacity-80`}>
                {descriptionOptions}
              </Regular12>
            </Box>


          </Box>

          <Box className="flex flex-col justify-center items-right text-right gap-1">
            <SemiBold16>{formatCurrency(subtotal)}</SemiBold16>
            {!!discount && discount > 0 && (
              <>
                <motion.div
                  key={discount}
                  variants={variants}
                  animate="show"
                  initial="hide"
                  className="inline-flex justify-center items-center gap-2 px-2 rounded-md ml-auto"
                  style={{ backgroundColor: "#f8d38f" }}
                >
                  <SemiBold12 styles={{ color: theme => theme?.palette?.neutral90?.main }}>
                    {formatCurrency(discount * quantity)} OFF
                  </SemiBold12>
                </motion.div>
                <Regular12 className={"line-through opacity-70"}>
                  {formatCurrency(nonOfferPrice)}
                </Regular12>
              </>
            )}
            <CartItemCounterContainer
              _id={_id}
              index={index}
              quantity={quantity}
              toogleTrash={toogleTrash}
            />
          </Box>
        </Box>
      </motion.li>

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
