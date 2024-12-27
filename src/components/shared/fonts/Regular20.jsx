import Typography from "@mui/material/Typography";

function Regular20({ children, className, styles }) {
  return (
    <Typography
      fontSize="20px"
      lineHeight="30px"
      className={className}
      fontFamily="Poppins"
      fontWeight={400}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default Regular20;
