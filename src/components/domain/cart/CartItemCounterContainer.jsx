import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "#/components/shared/icons/AddIcon";
import TrashIcon from "#/components/shared/icons/TrashIcon";
import MinusIcon from "#/components/shared/icons/MinusIcon";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";

export default function CartItemCounterContainer({ _id, index, quantity }) {
  const { handleRemoveFromCart, handleUpdateQuantity } = useCartUtils();

  const handleAdd = () => {
    handleUpdateQuantity("add", index);
  };

  const handleSubstract = () => {
    handleUpdateQuantity("substract", index);
  };

  const handleRemove = () => {
    handleRemoveFromCart(_id, index);
  };

  return (
    <ButtonGroup
      variant="text"
      aria-label="text button group"
      className="flex flex-row items-center h-[32px] w-[104px] gap-0 m-0 rounded-md"
      sx={{ bgcolor: (theme) => theme.palette.neutral5.main }}
    >
      {quantity === 1 && (
        <IconButton sx={style.button} onClick={handleRemove}>
          <TrashIcon className="w-4 h-4" />
        </IconButton>
      )}

      {quantity > 1 && (
        <IconButton sx={style.button} onClick={handleSubstract}>
          <MinusIcon className="w-4 h-4" />
        </IconButton>
      )}

      <Box className="flex-1 text-center">
        <SemiBold14>{quantity}</SemiBold14>
      </Box>
      <IconButton sx={style.button} onClick={handleAdd}>
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
