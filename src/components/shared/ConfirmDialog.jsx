import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";

const ConfirmDialog = ({ isOpen, title, content, handleOk, handleCancel }) => {
  return (
    <Dialog open={isOpen} onClose={handleCancel}>
      <DialogTitle>
        <SemiBold14>{title}</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Regular14>{content}</Regular14>
      </DialogContent>
      <DialogActions sx={{ gap: "12px" }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{ width: "100px" }}
        >
          No
        </Button>
        <Button
          onClick={handleOk}
          variant="contained"
          sx={{ width: "100px" }}
          color="primary"
          autoFocus
        >
          S&iacute;
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
