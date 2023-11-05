import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import Bold14 from "#/components/shared/fonts/Bold14";
import { CURRENCY } from "#/config/constants";
import { motion } from "framer-motion";
import ImageService from "#/services/ImageService.js";
import { formatCurrency } from "#/utils/currency";

function ProductCardContainer({ product }) {
  const { findImage } = ImageService();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={style.container}
      className="rounded-md p-2 flex flex-col items-start justify-start min-h-[150px] shadow-sm"
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        src={findImage(product?._id, "PRD")}
        alt={`Imagen de ${product?.name}`}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <Regular16>{product?.name}</Regular16>
      <Bold14>{formatCurrency(product?.price)}</Bold14>
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
};

export default ProductCardContainer;
