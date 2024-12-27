import Typography from "@mui/material/Typography";

function SemiBold14({ children, className, styles }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Poppins"
      fontWeight={500}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default SemiBold14;
