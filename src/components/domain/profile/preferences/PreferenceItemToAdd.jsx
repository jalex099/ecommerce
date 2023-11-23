import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import CheckSquareIcon from "#/components/shared/icons/CheckSquareIcon";

export default function PreferenceItemToAdd({ id, name, active, ...props }) {
  console.log(id === "65034be1a446e3d85dbdd3c4", active);
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
