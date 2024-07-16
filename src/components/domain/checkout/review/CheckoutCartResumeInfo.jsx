import Box from "@mui/material/Box";
import { formatCurrency } from "#/utils/currency.js";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Bold18 from "#/components/shared/fonts/Bold18.jsx";
import Divider from "@mui/material/Divider";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Bold16 from "#/components/shared/fonts/Bold16.jsx";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import { useMemo } from "react";

const CheckoutCartResumeInfo = ({ numberOfItems, products, shipping = 0, subtotal = 0, discount = 0, total = 0 }) => {

  const isDiscount = useMemo(() => discount > 0 && subtotal !== total, [discount, subtotal, total]);

  return (
    <Box className={"w-full  flex flex-col gap-4"}>
      <SemiBold16>
        Detalle de pago
      </SemiBold16>
      <Box className="flex flex-col gap-1">
        {/*{*/}
        {/*  products?.map((product, index) => (*/}
        {/*    <Box key={index} className="flex flex-row justify-between items-center">*/}
        {/*      <Regular14>{product?.name}</Regular14>*/}
        {/*      <Regular14>{formatCurrency(product?.basePrice + product?.aditionalPrice)}</Regular14>*/}
        {/*    </Box>*/}
        {/*  ))*/}
        {/*}*/}
        {/*<Divider sx={{borderStyle:'dashed'}}/>*/}
          <>
            <Box className="flex flex-row justify-between items-center">
              <Regular14>Subtotal</Regular14>
              <Regular14>{formatCurrency(subtotal)}</Regular14>
            </Box>
            <Box className="flex flex-row justify-between items-center">
              <Regular14>Env&iacute;o</Regular14>
              <Regular14>{formatCurrency(shipping)}</Regular14>
            </Box>
            <Box
              className="flex flex-row justify-between items-center"
              sx={{
                color: (theme) => isDiscount ? theme.palette.secondary.main : theme.palette.grey[500]
              }}
            >
              <Regular14>Ahorro</Regular14>
              <Regular14>{isDiscount ? `- ${formatCurrency(discount)}` : formatCurrency(discount)}</Regular14>
            </Box>

            <Divider sx={{borderStyle:'dashed'}}/>
          </>
        <Box className="flex flex-row justify-between items-center">
          <Bold16>Total a pagar</Bold16>
          <Bold16>{formatCurrency(total)}</Bold16>
        </Box>
      </Box>
    </Box>
  )
}

export default CheckoutCartResumeInfo