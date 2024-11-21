import Typography from "@mui/material/Typography";

function ExtraBold24({ children, className, styles, ...props }) {
  return (
    <Typography
      className={className}
      fontSize="24px"
      lineHeight="34px"
      fontFamily="Comfortaa"
      fontWeight={600}
      sx={styles}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold24;
