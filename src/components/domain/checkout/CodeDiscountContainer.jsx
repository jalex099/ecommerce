import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import { useHookstate } from "@hookstate/core";


const CodeDiscountContainer = () => {
  const tempCode = useHookstate("");
  const checkoutState = useCheckoutState();

  const handleChange = (e) => {
    tempCode.set(e.target.value);
  }

  const handleClick = () => {
    checkoutState?.setDiscountCode(tempCode?.value);
  }

  return (
    <Box className={"w-full flex flex-col gap-4"}>
      <SemiBold16>
        C&oacute;digo de descuento
      </SemiBold16>
      <TextField
        label="C&oacute;digo"
        variant="standard"
        autoComplete="discount-code"
        // InputLabelProps={{ shrink: true }}
        sx={{ width: "100%" }}
        size="small"
        value={tempCode?.value}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  )
}

export default CodeDiscountContainer;