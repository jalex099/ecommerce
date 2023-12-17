import HeartOffIcon from "#/components/shared/icons/HeartOffIcon";
import HeartOnIcon from "#/components/shared/icons/HeartOnIcon";
import ClientFavoriteProductsService from "#/services/ClientFavoriteProductsService";
import { useMemo } from "react";
import ProductController from "#/components/domain/product/controllers/ProductController";
import { useAuthState } from "#/stores/AuthState";
import Button from "@mui/material/Button";

export default function FavoriteToogleContainer() {
  const { favoriteProducts, add, remove, isLoading } =
    ClientFavoriteProductsService();
  const { temporal } = ProductController();
  const auth = useAuthState();

  const isFav = useMemo(() => {
    if (!temporal || favoriteProducts?.length === 0) return false;
    return favoriteProducts?.find((fav) => fav?.product === temporal?._id);
  }, [favoriteProducts, temporal]);

  //* Handle of set as fav or remove from fav
  const handleToggleFav = () => {
    if (isFav) remove.mutate(temporal?._id);
    else add.mutate(temporal?._id);
  };
  if (!!auth?.isVerified && !!auth?.isAuthenticated) {
    return (
      <Button
        className=" aspect-square rounded-full "
        aria-label="fav"
        variant="outlined"
        onClick={handleToggleFav}
        sx={style.button}
      >
        <FavIcon isFav={isFav} isLoading={isLoading} />
      </Button>
    );
  }
}

const style = {
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: "100%",
    p: 0,
    m: 0,
    minWidth: "40px",
    maxWidth: "40px",
  },
};

const FavIcon = ({ isFav }) => {
  if (isFav) return <HeartOnIcon className="w-5 h-5" />;
  else if (!isFav) return <HeartOffIcon className="w-5 h-5" />;
  else return <></>;
};
