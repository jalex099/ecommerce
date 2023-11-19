import Box from "@mui/material/Box";
import DataService from "#/services/DataService";
import { useMemo } from "react";
import ImageService from "#/services/ImageService.js";
import Picture from "#/components/shared/Picture";
import Regular14 from "#/components/shared/fonts/Regular14";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import RedirectionService from "#/services/RedirectionService";

function FavProductContainer({ id }) {
  const { findImage } = ImageService();
  const { menu, categories } = DataService();
  const { redirectToProduct } = RedirectionService();

  const product = useMemo(() => {
    return menu?.find((item) => item?._id === id);
  }, [menu, id]);

  const category = useMemo(() => {
    return categories?.find((item) => item?._id === product?.category);
  }, [categories, product]);

  const handleClick = () => {
    redirectToProduct(product?._id);
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-full h-16 mb-8 rounded-md cursor-pointer "
      onClick={handleClick}
    >
      <Box className="w-full h-full  flex flex-row justify-between items-center">
        <Box className="flex-1 h-full flex flex-row gap-3">
          <Picture
            webp={findImage(product?._id, "PRD", "webp")}
            jpg={findImage(product?._id, "PRD", "jpg")}
            alt={`Imagen de ${product?.name}`}
            className="w-12 h-12 object-cover rounded-full overflow-hidden"
          />
          <Box className="flex flex-col gap-0">
            <Regular14>{product?.name}</Regular14>
            <Regular14 className="opacity-60">{category?.name}</Regular14>
          </Box>
        </Box>
        <Regular14 onClick={handleClick}>Eliminar</Regular14>
      </Box>
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

export default FavProductContainer;
