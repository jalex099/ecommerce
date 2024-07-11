import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SemiBold12 from "#/components/shared/fonts/SemiBold12";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular14 from "#/components/shared/fonts/Regular14";
import { useHookstate } from "@hookstate/core";
import ClientFavoriteProductsService from "#/services/ClientFavoriteProductsService";
import FavProductContainer from "#/components/domain/profile/FavProductContainer";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import CloseIcon from "#/components/shared/icons/CloseIcon.jsx";
import IconButton from "@mui/material/IconButton";

function FavoritesDialog() {
  const { favoriteProducts, remove } = ClientFavoriteProductsService();
  const isOpen = useHookstate(false);

  const handleOpen = () => {
    isOpen.set(true);
  };

  const handleClose = () => {
    isOpen.set(false);
  };

  const handleRemove = (id) => {
    remove.mutate(id);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        sx={style.button}
        onClick={handleOpen}
      >
        <SemiBold12>
          {favoriteProducts?.length} Favorito
          {favoriteProducts?.length !== 1 ? "s" : ""}
        </SemiBold12>
      </Button>
      <Dialog onClose={handleClose} open={isOpen.get()} PaperProps={{ sx: style.dialog }}>
        <DialogTitle>
          <SemiBold14>Favoritos</SemiBold14>
        </DialogTitle>
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
        <DialogContent>
          {
            //* If there are no favorites
            favoriteProducts?.length === 0 && (
              <Box className="flex justify-center ">
                <Regular14 className="text-center max-w-[300px]">
                  No tienes productos favoritos. Agrega productos a favoritos
                  para verlos aquí.
                </Regular14>
              </Box>
            )
          }
          {
            //* If there are favorites
            favoriteProducts?.length > 0 && (
              <Box className="w-full h-[300px]">
                <motion.ul
                  variants={list}
                  initial="hidden"
                  animate="visible"
                  className="w-full h-full overflow-y-auto "
                >
                  {favoriteProducts?.map((fav) => (
                    <FavProductContainer
                      key={fav?._id}
                      id={fav?.product}
                      onClick={handleRemove}
                    />
                  ))}
                </motion.ul>
              </Box>
            )
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const style = {
  button: {},
  dialog: {
    minHeight: "250px",
    width: "100%",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
};

export default FavoritesDialog;
