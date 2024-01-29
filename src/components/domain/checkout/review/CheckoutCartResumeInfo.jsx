import Box from "@mui/material/Box";
import { formatCurrency } from "#/utils/currency.js";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import Bold18 from "#/components/shared/fonts/Bold18.jsx";
import Divider from "@mui/material/Divider";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";

const CheckoutCartResumeInfo = ({ numberOfItems, products, subtotal = 0, discount = 0, total = 0 }) => {
  return (
    <Box className={"w-full"}>

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
        {!!discount && discount > 0 && subtotal !== total && (
          <>
            <Box className="flex flex-row justify-between items-center">
              <Regular16>Subtotal</Regular16>
              <Regular16>{formatCurrency(subtotal)}</Regular16>
            </Box>
            <Box
              className="flex flex-row justify-between items-center"
              sx={{
                color: (theme) => theme.palette.secondary.main,
              }}
            >
              <Regular16>Ahorro</Regular16>
              <Regular16>- {formatCurrency(discount)}</Regular16>
            </Box>
            <Divider sx={{borderStyle:'dashed'}}/>
          </>
        )}
        <Box className="flex flex-row justify-between items-center">
          <Bold18>Total</Bold18>
          <Bold18>{formatCurrency(total)}</Bold18>
        </Box>
      </Box>
    </Box>
  )
}

export default CheckoutCartResumeInfo