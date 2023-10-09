import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Intro"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
