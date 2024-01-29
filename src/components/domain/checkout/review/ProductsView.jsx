import Box from "@mui/material/Box";
import { Avatar, AvatarGroup } from "@mui/material";
import ImageService from "#/services/ImageService.js";
import { ImageList } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import HorizontalScroller from "#/components/shared/HorizontalScroller.jsx";
import Picture from "#/components/shared/Picture.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { formatCurrency } from "#/utils/currency.js";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useMemo } from "react";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
const ProductsView = ({ products }) => {

  const { findImage } = ImageService();
  const {getDetails } = useCartUtils();
  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <SemiBold16>
        Lista de productos
      </SemiBold16>
      <Box className={"w-full flex justify-center flex-col gap-2"}>
        {
          products.map((prd, index) => (
            <Box
              key={index}
              className={"w-full h-[92px] flex items-start gap-4  py-2 px-4"}
            >
              <Box className={"h-full"}>
                <Picture
                  alt={prd.name}
                  webp={findImage(prd?._id, "PRD", "webp")}
                  jpg={findImage(prd?._id, "PRD", "jpg")}
                  blockAnimation
                  imgStyle={{borderRadius: "50%", objectFit: "cover", aspectRatio: "1/1"}}
                />
              </Box>
              <Box className={"flex-1"}>
                <SemiBold14>
                  {prd?.name}
                </SemiBold14>
                <Regular12 className="opacity-80">
                  {getDetails(prd?._id, prd?.options)?.map(({ name }, index) => {
                    return `${name} / `
                  })}
                </Regular12>
                <Regular14>
                  {prd?.quantity} x {formatCurrency(prd?.basePrice + prd?.aditionalPrice)}
                </Regular14>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default ProductsView;