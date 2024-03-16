import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import { useMemo } from "react";
import DataService from "#/services/DataService.js";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Picture from "#/components/shared/Picture.jsx";
import ImageService from "#/services/ImageService.js";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const FavoritesCard = ({ favorite , ...props}) => {
  const { findImage } = ImageService();
  const { menu } = DataService();

  const product = useMemo(() => {
    return menu?.find((product) => product._id === favorite?.product);
  }, [favorite]);

  return (
    <Box {...props} className={"h-[120px] min-w-[250px] flex flex-row gap-4 p-2 shadow-md justify-center items-center"}>
      <Picture
        webp={findImage(product?._id, "PRD", "webp")}
        jpg={findImage(product?._id, "PRD", "jpg")}
        alt={`Imagen de ${'PRD'}`}
        className="h-[64px] w-[64px] aspect-square object-cover rounded-2xl overflow-hidden"
        blockAnimation
        // onClick={() => redirectToProduct(productsIdsForImages[0])}
      />
      <Box className={"flex-grow w-1/2"}>
        <SemiBold16>
          {product?.name}
        </SemiBold16>
        <Regular12 className="overflow-hidden overflow-ellipsis whitespace-normal line-clamp-3">
          {product?.description}
        </Regular12>
      </Box>
    </Box>
  )
}
export default FavoritesCard;