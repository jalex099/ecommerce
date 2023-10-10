import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className, styles }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Intro"
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
