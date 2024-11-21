import Typography from "@mui/material/Typography";

function SemiBold12({ children, className, styles, ...props }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={600}
      sx={styles}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default SemiBold12;
