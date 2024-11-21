import Typography from "@mui/material/Typography";

function Regular16({ children, className, styles }) {
  return (
    <Typography
      fontSize="16px"
      lineHeight="26px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={400}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default Regular16;
