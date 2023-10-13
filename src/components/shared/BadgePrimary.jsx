import Box from "@mui/material/Box";

function BadgePrimary({ size, children, ...props }) {
  const style = {
    container: {
      backgroundColor: (theme) => theme.palette.primary10.main,
      borderRadius: "8px",
      fontSize: size === "small" ? "12px" : size === "large" ? "18px" : "14px",
      padding: "16px 24px",
      color: (theme) => theme.palette.primary140.main,
      mx: "auto",
      textAlign: "center",
      textWrap: "balance",
      cursor: "not-allowed",
      userSelect: "none",
      MozUserSelect: "none",
      WebkitUserSelect: "none",
    },
  };
  return (
    <Box sx={style.container} {...props}>
      {children}
    </Box>
  );
}

export default BadgePrimary;
