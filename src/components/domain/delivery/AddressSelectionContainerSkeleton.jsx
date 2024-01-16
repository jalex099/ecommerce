import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const AddressSelectionContainerSkeleton = () => {
  return (
    <Box className="flex flex-col gap-2 ">
      <Skeleton variant="text" width="100%" height={28} />
      <Stack spacing={2}>
        <Skeleton variant="rectangular" width="100%" height={100} />
        <Skeleton variant="rectangular" width="100%" height={100} />
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Stack>
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="60%" height={24} />
    </Box>
  )
}

export default AddressSelectionContainerSkeleton