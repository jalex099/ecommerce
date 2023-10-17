import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function GoBackIcon({ styles = {} }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return <ArrowBackIcon onClick={handleClick} fontSize="32px" sx={styles} />;
}

export default GoBackIcon;
