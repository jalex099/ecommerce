import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SemiBold12 from "#/components/shared/fonts/SemiBold12";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";
import { useHookstate } from "@hookstate/core";
import Skeleton from "@mui/material/Skeleton";

function FavoritesDialog({ items, isLoading }) {
  const isOpen = useHookstate(false);

  const handleOpen = () => {
    if (items?.length === 0) return;
    isOpen.set(true);
  };

  const handleClose = () => {
    isOpen.set(false);
  };

  if (isLoading)
    return (
      <Skeleton animation="wave" height={60} width={130} sx={{ margin: 0 }} />
    );
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        sx={style.button}
        onClick={handleOpen}
      >
        <SemiBold12>{items?.length} Favoritos</SemiBold12>
      </Button>
      <Dialog onClose={handleClose} open={isOpen.get()} sx={style.dialog}>
        <DialogTitle>
          <SemiBold14>10 Favoritos</SemiBold14>
        </DialogTitle>
        <DialogContent>
          <Regular14>10 Favoritos</Regular14>
        </DialogContent>
      </Dialog>
    </>
  );
}

const style = {
  button: {},
  dialog: {
    minHeight: "200px",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
};

export default FavoritesDialog;
