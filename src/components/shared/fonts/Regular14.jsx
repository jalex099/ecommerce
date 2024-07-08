import Typography from "@mui/material/Typography";

function Regular14({ children, className, styles, ...props }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Intro"
      sx={styles}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Regular14;
