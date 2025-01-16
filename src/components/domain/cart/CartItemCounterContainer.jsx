import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "#/components/shared/icons/AddIcon";
import TrashIcon from "#/components/shared/icons/TrashIcon";
import MinusIcon from "#/components/shared/icons/MinusIcon";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import { MAX_ITEMS_COUNTER } from "#/config/constants.js";
import ConfirmDialog from "#/components/shared/ConfirmDialog.jsx";
import { useHookstate } from "@hookstate/core";

export default function CartItemCounterContainer({ _id, index, quantity, toogleTrash }) {
  const { handleRemoveFromCart, handleUpdateQuantity } = useCartUtils();
  const openConfirmDialog = useHookstate(false);

  const handleAdd = () => {
    if (quantity >= MAX_ITEMS_COUNTER) return;
    handleUpdateQuantity("add", index);
  };

  const handleSubstract = () => {
    handleUpdateQuantity("substract", index);
  };

  const handleRemove = () => {
    handleRemoveFromCart(_id, index);
  };
  const handleOpenConfirmDialog = () => {
    toogleTrash();
    openConfirmDialog.set(true);
  }

  const handleCloseConfirmDialog = () => {
    toogleTrash();
    openConfirmDialog.set(false);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={openConfirmDialog?.value}
        title="Eliminar producto"
        content="¿Estás seguro que deseas eliminar este producto de tu carrito?"
        handleOk={handleRemove}
        handleCancel={handleCloseConfirmDialog}
        onClose={handleCloseConfirmDialog}
      />
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        className="flex flex-row items-center h-[32px] w-[84px] gap-0 m-0 rounded-md"
        sx={{ bgcolor: (theme) => theme.palette.neutral5.main }}
      >
        {quantity === 1 && (
          <IconButton sx={style.button} onClick={handleOpenConfirmDialog}>
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
        <IconButton sx={style.button} onClick={handleAdd}
          disabled={quantity >= MAX_ITEMS_COUNTER}
        >
          <AddIcon className="w-4 h-4" />
        </IconButton>
      </ButtonGroup>
    </>
  );
}

const style = {
  button: {
    width: "32px",
    height: "32px",
  },
};
