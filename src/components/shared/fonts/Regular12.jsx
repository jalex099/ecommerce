import Typography from "@mui/material/Typography";

function Regular12({ children, className, styles, ...props }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={400}
      sx={styles}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Regular12;
