import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className, styles }) {
  return (
    <Typography
      fontSize="18px"
      lineHeight="28px"
      className={className}
      fontFamily="Intro"
      fontWeight={400}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
