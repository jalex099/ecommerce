import Box from "@mui/material/Box";
import DataService from "#/services/DataService.js";
import { motion } from "framer-motion";
import ImageService from "#/services/ImageService.js";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Bold16 from "#/components/shared/fonts/Bold16.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { formatCurrency } from "#/utils/currency.js";
import Picture from "#/components/shared/Picture.jsx";

const OrderProductsDetails = ({ menu : menuOrder }) => {
  const { menu } = DataService();
  const { findImage } = ImageService();
  return (
    <Box className={"w-full flex flex-col gap-2 items-center"}>
      {
        menuOrder?.map((product, index) => {
          const productData = menu?.find(item => item?._id === product?.product)
          return (
            <Box key={index} className={"flex flex-row gap-1 items-center my-2 justify-between px-4 w-full"}>
              <Box className={"w-12 h-12"}>
                <Picture
                  jpg={findImage(productData?._id, "PRD", "jpg")}
                  webp={findImage(productData?._id, "PRD", "webp")}
                  alt={productData?.name}
                  className={"w-full h-full object-cover rounded-2xl"}
                />
              </Box>
              <Box className={"flex flex-col gap-0"}>
                <Box className={"flex flex-row gap-1"}>
                  <SemiBold14>
                    {product?.quantity} x
                  </SemiBold14>
                  <Regular14>
                    {productData?.name}
                  </Regular14>
                </Box>
                <Box className={"text-right"}>
                  <Regular14 className={"opacity-80"}>
                    {formatCurrency(product?.total || 0)}
                  </Regular14>
                </Box>

              </Box>
            </Box>
          )
        })
      }
    </Box>
  )
}

export default OrderProductsDetails;
