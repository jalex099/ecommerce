import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function GoBackIcon({ styles = {}, containerStyle = {} }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={containerStyle} onClick={handleClick}>
      <ArrowBackIcon fontSize="32px" sx={styles} />
    </Box>
  );
}

export default GoBackIcon;
