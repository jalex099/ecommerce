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
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { ORDER_STEPS } from "#/config/constants.js";
import Bold12 from "#/components/shared/fonts/Bold12.jsx";
import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect.jsx";

const OrderCard = ({ order, isLastItem = false }) => {
  const { findImage } = ImageService();
  const navigate = useNavigate();

  const productsIdsForImages = useMemo(()=>{
    return order?.menu?.map((prd) => prd?.product?._id)
  }, [order?.menu])

  const handleClick = ()=>{
    navigate(`/rastreo-de-orden/${order?._id}`)
  }

  return (
    <>
      <motion.li
        layout
        variants={item}
        className="w-full relative rounded-2xl overflow-hidden"
        onClick={handleClick}
      >
        <TouchRippleEffect className="w-full flex flex-col gap-4 justify-start items-start p-4 ">
       <Box className={"w-full flex flex-row gap-2 h-[100px] "}>
         <Picture
           webp={findImage(productsIdsForImages[0], "PRD", "webp")}
           jpg={findImage(productsIdsForImages[0], "PRD", "jpg")}
           alt={`Imagen de ${'PRD'}`}
           className="h-full aspect-square object-cover rounded-2xl overflow-hidden"
           blockAnimation
           // onClick={() => redirectToProduct(productsIdsForImages[0])}
         />
         <Box className={"flex-grow text-right flex flex-col items-end justify-start gap-1 max-w-[60%]"}>
           <SemiBold18 className={"capitalize"}>
             { formatDistance(new Date(order?.date), new Date(), {locale: es})} atr&aacute;s
           </SemiBold18>
           {/*<Regular12>*/}
           {/*  {format(new Date(order?.date), "dd 'de' MMMM", {locale: es})}*/}
           {/*</Regular12>*/}
           <Regular12>
            {order?.code}
           </Regular12>
           <Box
             sx={{
               bgcolor:
                 order?.status === "PENDING" ? 'green10.main' :
                   order?.status === "INPROCESS" ? 'yellow10.main' :
                     order?.status === "ONTHEWAY" ? 'blue10.main' :
                       order?.status === "FINISHED" ? 'green10.main' : "neutral40",
             }}
             className={"max-w-[120px] px-2 py-1 rounded-2xl"}
           >
             <SemiBold12 className={"uppercase"}>
               {
                 ORDER_STEPS?.find(step => step?.value === order?.status)?.label
               }
             </SemiBold12>
           </Box>
         </Box>
       </Box>
        </TouchRippleEffect>
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