import Typography from "@mui/material/Typography";

function Bold32({ children, className }) {
  return (
    <Typography
      className={className}
      fontSize="32px"
      lineHeight="44px"
      fontFamily="Poppins"
      fontWeight={600}
    >
      {children}
    </Typography>
  );
}

export default Bold32;
