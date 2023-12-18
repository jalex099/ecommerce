import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";

export default function CartItemCounterContainer() {
  return (
    <Box
      className="flex flex-row items-center justify-center h-[32px] w-[96px] gap-0 m-0 rounded-md"
      sx={{ bgcolor: (theme) => theme.palette.neutral5.main }}
    >
      <SemiBold14 className="px-3 text-center">-</SemiBold14>
      <SemiBold14 className="flex-1 text-center">1</SemiBold14>
      <SemiBold14 className="px-3">+</SemiBold14>
    </Box>
  );
}
