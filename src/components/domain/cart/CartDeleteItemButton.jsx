import IconButton from "@mui/material/IconButton";
import DeleteIcon from "#/components/shared/icons/DeleteIcon";

function CartDeleteItemButton({ ...props }) {
  return (
    <IconButton
      aria-label="delete"
      variant="contained"
      className="w-8 h-8 "
      sx={{ p: "8px", position: "absolute", top: 8, right: 8 }}
      {...props}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default CartDeleteItemButton;
