import { motion } from "framer-motion";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { format, formatDistance, parse } from "date-fns";
import { es } from "date-fns/locale";
import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Divider from "@mui/material/Divider";
import Picture from "#/components/shared/Picture.jsx";
import { useMemo } from "react";
import ImageService from "#/services/ImageService.js";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";

const OrderCard = ({ order, isLastItem = false }) => {
  const { findImage } = ImageService();

  const productsIdsForImages = useMemo(()=>{
    return order?.menu?.map((prd) => prd?.product?._id)
  }, [order?.menu])

  return (
    <>
      <motion.li
        layout
        variants={item}
        className="w-full flex flex-col gap-4 justify-start items-start p-4 "
      >
       <Box className={"w-full flex flex-row gap-2"}>
         <Picture
           webp={findImage(productsIdsForImages[0], "PRD", "webp")}
           jpg={findImage(productsIdsForImages[0], "PRD", "jpg")}
           alt={`Imagen de ${'PRD'}`}
           className="w-16 h-16 object-cover rounded-2xl overflow-hidden"
           // onClick={() => redirectToProduct(productsIdsForImages[0])}
         />
         <Box className={"flex-grow text-right"}>
           <SemiBold18>
             Hace { formatDistance(parse(order?.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date()), new Date(), {locale: es})}
           </SemiBold18>
           <Regular12>
             {format(new Date(order?.date), "dd 'de' MMMM", {locale: es})}
           </Regular12>
           <Regular12>
             {order?._id}
           </Regular12>
         </Box>
       </Box>
        {/*<Regular14>*/}
        {/*  {order?.status}*/}
        {/*</Regular14>*/}
      </motion.li>

    {!isLastItem && <Divider />}
  </>
  )
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
export default OrderCard;