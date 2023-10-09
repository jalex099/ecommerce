import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className }) {
  return (
    <Typography
      fontSize="18px"
      lineHeight="28px"
      className={className}
      fontFamily="Intro"
      fontWeight={600}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
