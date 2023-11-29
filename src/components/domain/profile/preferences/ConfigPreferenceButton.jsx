import IconButton from "@mui/material/IconButton";
import SettingIcon from "#/components/shared/icons/SettingIcon";

export default function ConfigPreferenceButton({ ...props }) {
  return (
    <IconButton
      {...props}
      variant="contained"
      className="w-6 h-6"
      aria-label="add"
    >
      <SettingIcon />
    </IconButton>
  );
}
