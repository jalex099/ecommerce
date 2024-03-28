import useCartUtils from "#/components/domain/cart/controllers/useCartUtils.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import TrashIcon from "#/components/shared/icons/TrashIcon.jsx";
import MinusIcon from "#/components/shared/icons/MinusIcon.jsx";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import AddIcon from "#/components/shared/icons/AddIcon.jsx";

export default function ProductCounter({ quantity, handleDecrement, handleIncrement}) {
  return (
    <ButtonGroup
      variant="text"
      aria-label="text button group"
      className="flex flex-row items-center h-[50px] w-[140px] gap-0 m-0 rounded-md"
      sx={{ bgcolor: (theme) => theme.palette.neutral5.main }}
    >

      {quantity !== null && (
        <IconButton sx={style.button} onClick={handleDecrement} disabled={quantity === 1}>
          <MinusIcon className="w-4 h-4" />
        </IconButton>
      )}

      <Box className="flex-1 text-center">
        <SemiBold14>{quantity}</SemiBold14>
      </Box>
      <IconButton sx={style.button} onClick={handleIncrement}>
        <AddIcon className="w-4 h-4" />
      </IconButton>
    </ButtonGroup>
  );
}

const style = {
  button: {
    width: "32px",
    height: "32px",
  },
};
