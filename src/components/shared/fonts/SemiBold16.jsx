import Typography from "@mui/material/Typography";

function SemiBold16({ children, className, styles }) {
  return (
    <Typography
      fontSize="16px"
      lineHeight="26px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={600}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default SemiBold16;
