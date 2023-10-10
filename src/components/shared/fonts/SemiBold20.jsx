import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className, styles }) {
  return (
    <Typography
      fontSize="20px"
      lineHeight="30px"
      className={className}
      fontFamily="Intro"
      fontWeight={600}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
