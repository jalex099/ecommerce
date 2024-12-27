import Typography from "@mui/material/Typography";

function Bold14({ children, className, styles }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Poppins"
      fontWeight={600}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default Bold14;
