import Typography from "@mui/material/Typography";

function SemiBold20({ children, className, styles }) {
  return (
    <Typography
      fontSize="20px"
      lineHeight="30px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={600}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default SemiBold20;
