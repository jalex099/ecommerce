import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const GoBackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button
      onClick={handleBack}
      icon="pi pi-chevron-left"
      rounded
      text
      aria-label="back"
    ></Button>
  );
};

export default GoBackButton;
