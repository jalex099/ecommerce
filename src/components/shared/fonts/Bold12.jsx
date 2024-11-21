import Typography from "@mui/material/Typography";

function Bold12({ children, className }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={700}
    >
      {children}
    </Typography>
  );
}

export default Bold12;
