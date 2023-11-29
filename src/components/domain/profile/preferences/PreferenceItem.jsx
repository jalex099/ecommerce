import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import CheckSquareIcon from "#/components/shared/icons/CheckSquareIcon";

export default function PreferenceItem({ id, name, active, ...props }) {
  return (
    <Box
      {...props}
      className="flex flex-row items-center justify-between py-2 px-0"
    >
      <Regular14>{name || ""}</Regular14>
      {active && <CheckSquareIcon className="w-5 rounded-2xl" />}
    </Box>
  );
}
