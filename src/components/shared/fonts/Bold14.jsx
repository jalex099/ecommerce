import Typography from "@mui/material/Typography";

function Bold14({ children, className, styles }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={700}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default Bold14;
