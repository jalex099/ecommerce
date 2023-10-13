import Typography from "@mui/material/Typography";

function Bold20({ children, className }) {
  return (
    <Typography
      fontSize="20px"
      lineHeight="30px"
      className={className}
      fontFamily="Intro"
      fontWeight={700}
    >
      {children}
    </Typography>
  );
}

export default Bold20;
