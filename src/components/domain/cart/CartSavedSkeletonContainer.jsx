import { Box, Skeleton } from "@mui/material";

const CartSavedSkeletonContainer = () => {
  return (
    <Box className="flex flex-row gap-2 justify-between">
      <Skeleton
        variant="rectangular"
        height={40}
        className="w-[120px]"
        sx={{ borderRadius: "8px" }}
      />
      <Box className="flex flex-col gap-2 flex-1 justify-between">
        <Skeleton variant="rectangular" width="60%" height={10} />
        <Skeleton variant="rectangular" width="100%" height={20} />
      </Box>
    </Box>
  );
};

export default CartSavedSkeletonContainer;
