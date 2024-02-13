import Regular18 from "#/components/shared/fonts/Regular18.jsx";
import Box from "@mui/material/Box";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import CartIcon from "#/components/shared/icons/CartIcon.jsx";
import Badge from "@mui/material/Badge";
import { useMemo } from "react";
import useCartState from "#/stores/cart.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from "#/config/constants.js";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const CartAdvise = () => {
  const cart = useCartState();
  const navigate = useNavigate();

  const badgeContent = useMemo(() => {
    return cart?.getItemsCounter() || 0;
  }, [cart?.getItemsCounter()]);

  const handleClickGoToCart = () => {
    navigate("/carrito");
  }

  return (
    <Box sx={style.container} className={"px-6 py-4 rounded-2xl w-full flex flex-col gap-4 items-center"}>
     <Box className={"flex gap-2 justify-between items-center w-full"}>
       <Badge badgeContent={badgeContent} color="secondary" variant="standard">
        <CartIcon className={"w-8 h-8"}/>
      </Badge>
       <Box className={"text-right relative"}>
         <Regular14>
           &#191;Terminaste de comprar?
         </Regular14>
         <motion.div
           initial={SLIDE_UP_ANIMATION.initial}
           animate={SLIDE_UP_ANIMATION.animate}
           transition={SLIDE_UP_ANIMATION.transition}
           exit={SLIDE_UP_ANIMATION.exit}
         >
           <SemiBold18>
             &#161;Vamos al carrito&#33;
           </SemiBold18>
         </motion.div>
       </Box>
     </Box>
      <Regular12 styles={{color: theme => theme?.palette?.neutral60?.main}}>
        Tienes {badgeContent} producto {badgeContent > 1 && 's'} en tu carrito
      </Regular12>
      <Button
        variant="contained"
        size={"small"}
        color="primary"
        onClick={handleClickGoToCart}
      >
        Ir ahora
      </Button>
    </Box>
  )
}


const style = {
  container: {
    backgroundColor: theme => theme?.palette?.primary10?.main
  },
};

export default CartAdvise;