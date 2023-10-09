import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className }) {
  return (
    <Typography
      fontSize="16px"
      lineHeight="26px"
      className={className}
      fontFamily="Intro"
      fontWeight={400}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
