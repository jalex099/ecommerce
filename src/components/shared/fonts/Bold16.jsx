import Typography from "@mui/material/Typography";

function Bold16({ children, className }) {
  return (
    <Typography
      fontSize="16px"
      lineHeight="26px"
      className={className}
      fontFamily="Poppins"
      fontWeight={600}
    >
      {children}
    </Typography>
  );
}

export default Bold16;
