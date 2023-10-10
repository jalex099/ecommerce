import Typography from "@mui/material/Typography";

function ExtraBold24({ children, className, styles }) {
  return (
    <Typography
      className={className}
      fontSize="24px"
      lineHeight="34px"
      fontFamily="Intro"
      fontWeight={400}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold24;
