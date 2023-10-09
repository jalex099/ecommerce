import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Intro"
      fontWeight={400}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
