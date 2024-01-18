import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";

const InfoDialog = ({
                         isOpen,
                         title,
                         content,
                          acceptText = "Aceptar",
                         handleAccept,
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
        <Button onClick={handleAccept} variant="outlined" className="flex-grow">
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
