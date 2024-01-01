import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular16 from "#/components/shared/fonts/Regular16";
import Regular14 from "#/components/shared/fonts/Regular14";
import CartService from "#/services/CartService.js";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const ChangeSelectedCartDialog = ({
  isOpen,
  handleClose,
  cart,
  onCartChange,
}) => {
  const { carts, refetch, isError, isLoading, isRefetching, isSuccess } =
    CartService();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: style.dialog }}
    >
      <DialogTitle>
        <SemiBold14>Cambiar carrito</SemiBold14>
        <IconButton onClick={refetch} variant="contained">
          <RefreshIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isError && (
          <Regular16>
            No se pudieron cargar los carritos, por favor intente de nuevo.
          </Regular16>
        )}
        {(isLoading || isRefetching) && (
          <Regular16>Cargando carritos...</Regular16>
        )}
        {isSuccess && carts?.length === 0 && (
          <Regular16> No hay carritos disponibles.</Regular16>
        )}
        {isSuccess && !isLoading && !isRefetching && carts?.length > 0 && (
          <Box className="flex flex-col gap-2 mb-8 w-full justify-center items-center">
            <Regular16>
              Seleccione el carrito que desea utilizar para esta compra.
            </Regular16>
            {carts?.map((element) => {
              return (
                <Box
                  key={element._id}
                  className="flex flex-row justify-between items-center w-full"
                >
                  <Regular14>{element?.menu?.length}</Regular14>
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSelectedCartDialog;

const style = {
  dialog: {
    minHeight: "200px",
  },
  link: {
    color: (theme) => theme.palette.primary120.main,
    cursor: "pointer",
  },
};
