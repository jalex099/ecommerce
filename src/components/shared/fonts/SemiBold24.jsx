import Typography from "@mui/material/Typography";

function ExtraBold24({ children, className, styles, ...props }) {
  return (
    <Typography
      className={className}
      fontSize="24px"
      lineHeight="34px"
      fontFamily="Poppins"
      fontWeight={500}
      sx={styles}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold24;
