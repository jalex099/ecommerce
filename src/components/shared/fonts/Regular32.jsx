import Typography from "@mui/material/Typography";

function ExtraBold32({ children, className, styles }) {
  return (
    <Typography
      className={className}
      fontSize="32px"
      lineHeight="44px"
      fontFamily="Poppins"
      fontWeight={400}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold32;
