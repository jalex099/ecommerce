import Typography from "@mui/material/Typography";

function SemiBold12({ children, className, styles }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Intro"
      fontWeight={600}
      sx={styles}
    >
      {children}
    </Typography>
  );
}

export default SemiBold12;
