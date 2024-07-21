import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";
import CartService from "#/services/CartService.js";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import CloseIcon from "#/components/shared/icons/CloseIcon";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import CartSavedSkeletonContainer from "#/components/domain/cart/CartSavedSkeletonContainer";
import { useCartState } from "#/stores/cart";

const ChangeSelectedCartDialog = ({ isOpen, handleClose }) => {
  const { carts, refetch, isError, isLoading, isRefetching, isSuccess } =
    CartService();
  const cart = useCartState();

  const { fillFromApi } = useCartUtils();
  const handleChange = (cartSelection) => {
    if(cartSelection?._id === cart?.getCartId()) return;
    fillFromApi(cartSelection);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: style.dialog }}
    >
      <DialogTitle>
        <SemiBold14>Carritos guardados</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon className="w-6 h-6" />
        </IconButton>
        <Box className="w-full flex flex-col gap-4">
          {isError && !isLoading && !isRefetching && (
            <Regular14>
              No se pudieron cargar los carritos, por favor intente de nuevo.
            </Regular14>
          )}
          {(isLoading || isRefetching) &&
            [1, 2, 3]?.map((item, index) => (
              <CartSavedSkeletonContainer key={index} />
            ))}
          {isSuccess && !isLoading && !isRefetching && carts?.length === 0 && (
            <Regular14> No hay carritos disponibles.</Regular14>
          )}
          {isSuccess && !isLoading && !isRefetching && carts?.length > 0 && (
            <Box className="flex flex-col gap-2 mb-8 w-full justify-center items-center">
              <Regular14>
                Seleccione el carrito que desea utilizar para esta compra.
              </Regular14>
              {carts?.map((element) => {
                return (
                  <Box
                    key={element._id}
                    className="flex flex-row justify-between items-center w-full px-4 py-2 rounded-md"
                    sx={{
                      color: theme => element._id === cart?.getCartId() && theme?.palette?.neutral40?.main
                    }}
                    onClick={() => handleChange(element)}
                  >
                    <Regular14>{element?.name} {element._id === cart?.getCartId() && '(Seleccionado)'}</Regular14>
                  </Box>
                );
              })}
            </Box>
          )}
          <Button onClick={refetch} variant="contained" className="">
            Volver a cargar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSelectedCartDialog;

const style = {
  dialog: {
    minHeight: "200px",
    width: "100%",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  link: {
    color: (theme) => theme.palette.primary120.main,
    cursor: "pointer",
  },
};
