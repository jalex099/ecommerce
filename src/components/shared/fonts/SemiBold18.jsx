import Typography from "@mui/material/Typography";

function SemiBold18({ children, className, styles }) {
  return (
    <Typography
      fontSize="18px"
      lineHeight="28px"
      className={className}
      fontFamily="Poppins"
      fontWeight={500}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default SemiBold18;
