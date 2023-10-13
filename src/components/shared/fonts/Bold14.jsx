import Typography from "@mui/material/Typography";

function Bold14({ children, className }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Intro"
      fontWeight={700}
    >
      {children}
    </Typography>
  );
}

export default Bold14;
