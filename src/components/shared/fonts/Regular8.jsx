import Typography from "@mui/material/Typography";

function Regular8({ children, className, styles, ...props }) {
  return (
    <Typography
      fontSize="8px"
      lineHeight="16px"
      className={className}
      fontFamily="Intro"
      fontWeight={400}
      sx={styles}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Regular8;
