import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function PreferenceSkeleton() {
  return (
    <Box sx={style.container}>
      <Skeleton
        animation="wave"
        height={40}
        width="60%"
        sx={{ marginBottom: "4px" }}
      />
      {[1, 2]?.map((item, index) => (
        <Box sx={style.subcontainer} key={index}>
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton animation="wave" height={30} width="70%" />
            <Skeleton animation="wave" height={20} width="40%" />
          </Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
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
  subcontainer: {
    marginTop: "8px",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },
};

export default PreferenceSkeleton;
