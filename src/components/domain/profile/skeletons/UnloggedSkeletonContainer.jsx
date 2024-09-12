import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function UnloggedSkeletonContainer() {
  return (
    <Box sx={style.container}>
      <Skeleton animation="wave" height={80} width="50%" />
      <Skeleton animation="wave" height={30} width="50%" />
      <Skeleton
        sx={{ marginTop: 8 }}
        variant="rectangular"
        width="100%"
        height={70}
        animation="wave"
      />
      <Skeleton
        sx={{ marginTop: 1 }}
        variant="rectangular"
        width="100%"
        height={70}
        animation="wave"
      />
      <Skeleton
        sx={{ marginTop: 2 }}
        variant="rectangular"
        width="100%"
        height={50}
        animation="wave"
      />
      <Skeleton
        animation="wave"
        height={30}
        width="50%"
        sx={{ marginTop: 4 }}
      />
      <Skeleton
        animation="wave"
        height={30}
        width="60%"
        sx={{ marginTop: 1 }}
      />
      <Skeleton
        animation="wave"
        height={30}
        width="70%"
        sx={{ marginTop: 2 }}
      />
      <Skeleton
        sx={{ marginTop: 2 }}
        variant="rectangular"
        width="80%"
        height={50}
        animation="wave"
      />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100vh - 80px - 70px)",
    width: "100%",
    padding: "0 24px",
  },
};
export default UnloggedSkeletonContainer;
