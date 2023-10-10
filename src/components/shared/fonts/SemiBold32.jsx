import Typography from "@mui/material/Typography";

function ExtraBold32({ children, className, styles }) {
  return (
    <Typography
      className={className}
      fontSize="32px"
      lineHeight="44px"
      fontFamily="Intro"
      fontWeight={600}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold32;
