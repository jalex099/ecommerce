import Typography from "@mui/material/Typography";

function Bold24({ children, className }) {
  return (
    <Typography
      className={className}
      fontSize="24px"
      lineHeight="34px"
      fontFamily="Intro"
      fontWeight={700}
    >
      {children}
    </Typography>
  );
}

export default Bold24;
