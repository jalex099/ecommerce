import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function AddressSkeleton() {
  return (
    <Box sx={style.container}>
      <Skeleton animation="wave" height={40} width="60%" />
      {[1, 2]?.map(() => (
        <>
          <Skeleton
            animation="wave"
            height={30}
            width="40%"
            sx={{ marginTop: "16px" }}
          />
          <Skeleton animation="wave" height={30} width="100%" />
          <Skeleton animation="wave" height={20} width="60%" />
        </>
      ))}
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
};

export default AddressSkeleton;
