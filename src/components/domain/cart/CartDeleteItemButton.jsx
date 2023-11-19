import IconButton from "@mui/material/IconButton";
import DeleteIcon from "#/components/shared/icons/DeleteIcon";

function CartDeleteItemButton({ id }) {
  return (
    <IconButton
      aria-label="delete"
      variant="contained"
      className="w-8 h-8 "
      sx={{ p: "8px", position: "absolute", top: 0, right: 0 }}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default CartDeleteItemButton;
