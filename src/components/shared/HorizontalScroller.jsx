import Box from "@mui/material/Box";

const HorizontalScroller = ({
  children,
  separate = false,
  showScrollbar = false,
}) => {
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
            display: showScrollbar ? "auto" : "none",
            height: "4px",
            width: "4px",
            backgroundColor: "transparent",
          },
          "::-webkit-scrollbar-thumb:horizontal": {
            background: (theme) => theme.palette.neutral10.main,
            borderRadius: (theme) => theme.shape.borderRadius,
          },
          width: "100%",
          gap: "16px",
          padding: separate ? "8px 16px" : "0px 8px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HorizontalScroller;
