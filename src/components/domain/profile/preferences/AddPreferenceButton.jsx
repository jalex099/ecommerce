import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export default function AddPreferenceButton({ ...props }) {
  return (
    <IconButton
      {...props}
      variant="contained"
      className="w-8 h-8"
      aria-label="add"
    >
      <AddIcon />
    </IconButton>
  );
}
