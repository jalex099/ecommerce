import {useNavigate} from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  return (
    <button className="btn btn-primary" onClick={handleBack}>Go Back</button>
  )
}

export default GoBackButton;