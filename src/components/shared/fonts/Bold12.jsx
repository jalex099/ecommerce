import Typography from "@mui/material/Typography";

function Bold12({ children, className, ...props }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Poppins"
      fontWeight={600}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Bold12;
