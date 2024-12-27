import Box from  "@mui/material/Box";
import CartWhiteIcon from "#/components/shared/icons/CartWhiteIcon.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect";
import useCartState from "#/stores/cart.js";
import { useMemo } from "react";
import Badge from "@mui/material/Badge"
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { motion } from "framer-motion";
import { formatCurrency } from "#/utils/currency.js";
import { useLocation, useNavigate } from "react-router-dom";

const GoToCartButton = ()=>{
    const cart = useCartState();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const badgeContent = useMemo(() => {
        return cart?.getItemsCounter() || 0;
      }, [cart?.getItemsCounter()]);

    const trigger = useScrollTrigger({
      target:  undefined,
    });

    const show = useMemo(() => {
        // Verifica si la URL es válida y el carrito tiene elementos
        if (!(pathname.startsWith("/menu") || pathname === '/')) return false;
        if (cart?.getItemsCounter() === 0) return false;
        return true;
      }, [pathname, cart]);

    const handleClickGoToCart = () => {
        navigate("/carrito");
      };

    if (!show) return null;
    return (
        <div
            className= "cursor-pointer"
        >
            <motion.div
                className= "w-[250px] lg:w-[350px] h-[72px] rounded-xl shadow-lg fixed bottom-[16px] left-0 right-0 m-auto overflow-hidden"
                layout
                transition={{duration: 0.3}}
                style={{
                    marginBottom: !trigger ?  '80px' : '0px'
                  }}
                onClick={handleClickGoToCart}
            >
                <Box
                    className={ "w-full h-full px-4 "}
                    sx={{
                        backgroundColor: theme=> theme?.palette?.primary?.main,
                        color: theme => theme?.palette?.neutral0?.main,
                    }}
                >
                    <TouchRippleEffect className="w-full h-full flex flex-row gap-2 items-center justify-between lg:justify-around">
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                        >
                            <SemiBold14>
                                Ir al carrito
                            </SemiBold14>
                            <Regular12>
                                Subtotal: {formatCurrency(cart?.getSubTotalFixed())}
                            </Regular12>
                        </motion.div>
                        <Badge
                            badgeContent={badgeContent}
                            color="secondary"
                            variant="standard"
                          >
                            <CartWhiteIcon className={"w-8 h-8"}/>
                        </Badge>
                    </TouchRippleEffect>
                </Box>
            </motion.div>
        </div>

    )
}

export default GoToCartButton;