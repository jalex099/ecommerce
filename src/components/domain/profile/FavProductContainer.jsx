import Box from "@mui/material/Box";
import DataService from "#/services/DataService";
import { useMemo } from "react";
import ImageService from "#/services/ImageService.js";
import Picture from "#/components/shared/Picture";
import Regular14 from "#/components/shared/fonts/Regular14";
import { motion } from "framer-motion";
import RedirectionService from "#/services/RedirectionService";
import Button from "@mui/material/Button";

function FavProductContainer({ id, onClick }) {
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
    if (typeof onClick === "function") onClick(product?._id);
  };

  return (
    <motion.li
      layout
      variants={item}
      className="w-full h-16 mb-8 rounded-md cursor-pointer "
      // onClick={handleClick}
    >
      <Box className="w-full h-full  flex flex-row justify-between items-center">
        <Box className="flex-1 h-full flex flex-row gap-3 items-center">
          <Picture
            webp={findImage(product?._id, "PRD", "webp")}
            jpg={findImage(product?._id, "PRD", "jpg")}
            alt={`Imagen de ${product?.name}`}
            className="w-12 h-12 object-cover rounded-full overflow-hidden"
            onClick={() => redirectToProduct(product?._id)}
          />
          <Box className="flex flex-col gap-0">
            <Regular14>{product?.name}</Regular14>
            <Regular14 className="opacity-60">{category?.name}</Regular14>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          sx={style.button}
          onClick={handleClick}
        >
          <Regular14>Eliminar</Regular14>
        </Button>
      </Box>
    </motion.li>
  );
}

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const style = {
  button: {
    padding: "8px 12px",
  },
};

export default FavProductContainer;
