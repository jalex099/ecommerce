import Regular16 from "#/components/shared/fonts/Regular16";
import Bold14 from "#/components/shared/fonts/Bold14";
import { motion } from "framer-motion";
import ImageService from "#/services/ImageService.js";
import { formatCurrency } from "#/utils/currency";
import Picture from "#/components/shared/Picture";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect";
import { useMemo } from "react";
import Box from "@mui/material/Box";

function ProductCardContainer({ product, offer, handleClick }) {
  const { findImage } = ImageService();
  const priceAfterDiscount = useMemo(() => {
    if (!offer) return null;
    switch (offer?.behavior) {
      case "PRC":
        return product?.price * (1 - offer?.amount / 100);
      case "MNT":
        return product?.price - offer?.amount;
      default:
        return null;
    }
  }, [offer]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={style.container}
      className="rounded-md p-2  shadow-md relative select-none"
      onClick={() => handleClick(product?._id)}
    >
      <TouchRippleEffect className="flex flex-col items-start justify-start rounded-md min-h-[150px] ">
        <Picture
          webp={findImage(product?._id, "PRD", "webp")}
          jpg={findImage(product?._id, "PRD", "jpg")}
          alt={`Imagen de ${product?.name}`}
          className="w-full aspect-square lg:h-64 object-cover rounded-md mb-3 overflow-hidden"
        />
        <Regular16>{product?.name}</Regular16>
        <Box className="flex flex-row gap-2">
          <Bold14 className={`${offer ? "text-gray-500 line-through" : ""} `}>
            {formatCurrency(product?.price)}
          </Bold14>
          {!!priceAfterDiscount && (
            <Bold14 styles={style.offer}>
              {formatCurrency(priceAfterDiscount)}
            </Bold14>
          )}
        </Box>
      </TouchRippleEffect>
    </motion.div>
  );
}

const style = {
  container: {
    // background: "red",
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr",
    // gridGap: "1rem",
  },
  offer: {
    color: (theme) => theme.palette.secondary.main,
  },
};

export default ProductCardContainer;
