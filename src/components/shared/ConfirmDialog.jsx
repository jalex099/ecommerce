import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";

const ConfirmDialog = ({
  isOpen,
  title,
  content,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  handleOk,
  handleCancel,
  ...props
}) => {
  return (
    <Dialog open={isOpen} {...props}>
      <DialogTitle>
        <SemiBold14>{title}</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Regular14>{content}</Regular14>
      </DialogContent>
      <DialogActions className="flex flex-row " sx={{ gap: "4px" }}>
        <Button onClick={handleCancel} variant="outlined" className="flex-grow">
          {cancelText}
        </Button>
        <Button
          onClick={handleOk}
          variant="contained"
          color="primary"
          autoFocus
          className="flex-grow"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
