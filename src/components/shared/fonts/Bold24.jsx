import Typography from "@mui/material/Typography";

function Bold24({ children, className }) {
  return (
    <Typography
      className={className}
      fontSize="24px"
      lineHeight="34px"
      fontFamily="Poppins"
      fontWeight={600}
    >
      {children}
    </Typography>
  );
}

export default Bold24;
