import Typography from "@mui/material/Typography";

function Regular12({ children, className, styles }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Intro"
      fontWeight={400}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default Regular12;
