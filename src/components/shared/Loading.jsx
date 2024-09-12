import Box from "@mui/material/Box";
// import LoadingGif from "#/assets/images/loading.gif";

function Loading() {
  return (
    <Box sx={style.container}>
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
      {/* <Box component={"img"} src={LoadingGif} alt="Loading..." sx={style.img} /> */}
    </Box>
  );
}

const style = {
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    zIndex: "tooltip",
    backgroundColor: "transparent",
    backdropFilter: "blur(4px)",
  },
  img: {
    width: "200px",
  },
};

export default Loading;
