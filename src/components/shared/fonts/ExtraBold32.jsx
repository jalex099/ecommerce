import Typography from "@mui/material/Typography";

function ExtraBold32({ children, className }) {
  return (
    <Typography
      className={className}
      fontSize="32px"
      lineHeight="44px"
      fontFamily="Intro"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold32;
