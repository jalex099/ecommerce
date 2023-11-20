import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";
import BookmarkOffIcon from "#/components/shared/icons/BookmarkOffIcon";
import BookmarkOnIcon from "#/components/shared/icons/BookmarkOnIcon";
import GoBackIcon from "#/components/shared/GoBackIcon";
import ClientFavoriteProductsService from "#/services/ClientFavoriteProductsService";
import { useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import ProductController from "#/components/domain/product/controllers/ProductController";

function ProductTopBar() {
  const { favoriteProducts, add, remove, isLoading } =
    ClientFavoriteProductsService();
  const { temporal } = ProductController();

  const isFav = useMemo(() => {
    if (!temporal || favoriteProducts?.length === 0) return false;
    return favoriteProducts?.find((fav) => fav?.product === temporal?._id);
  }, [favoriteProducts, temporal]);

  //* Handle of set as fav or remove from fav
  const handleToggleFav = () => {
    if (isFav) remove.mutate(temporal?._id);
    else add.mutate(temporal?._id);
  };

  return (
    <Box>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="go-back"
            variant="contained"
            className="w-8 h-8"
          >
            <GoBackIcon />
          </IconButton>
          <Box />
          <FavIcon
            isFav={isFav}
            isLoading={isLoading}
            handleToggleFav={handleToggleFav}
          />
        </Toolbar>
      </Fade>
    </Box>
  );
}

const FavIcon = ({ isFav, handleToggleFav }) => {
  if (isFav)
    return (
      <IconButton
        aria-label="fav"
        variant="contained"
        className="w-8 h-8"
        sx={{ padding: "4px" }}
        onClick={handleToggleFav}
      >
        <BookmarkOnIcon />
      </IconButton>
    );
  else if (!isFav)
    return (
      <IconButton
        aria-label="fav"
        variant="contained"
        className="w-8 h-8"
        sx={{ padding: "4px" }}
        onClick={handleToggleFav}
      >
        <BookmarkOffIcon />
      </IconButton>
    );
  else return <></>;
};

export default ProductTopBar;
