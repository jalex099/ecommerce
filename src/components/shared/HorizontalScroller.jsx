import Box from "@mui/material/Box";

const HorizontalScroller = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          alignItems: "flex-start",
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
          width: "100%",
          gap: "16px",
          padding: "0px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HorizontalScroller;
