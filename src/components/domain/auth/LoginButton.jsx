import { useUIState } from "#/hooks/UIState";
import { Button } from "primereact/button";

const LoginButton = ({ handleClose }) => {
  const ui = useUIState();

  const handleClick=(event)=>{
    handleClose(event);
    ui?.toogleLoginDialog();
  }

  return (
    <div className="w-full flex gap-2 items-center justify-between">
      <p className="text-xs">
        Identif&iacute;cate
      </p>
      <Button
        onClick={handleClick}
        icon="pi pi-sign-in"
        rounded
        text
        raised
        aria-label="login"
        size="small"
      />
    </div>
  );
};

export default LoginButton;
