import API from "#/repositories/API.js";

const ClientFavoriteProductsRepository = () => {
  const getFavoriteProducts = async () => {
    return await API.get("/client/favorite-products", {
      secure: true,
    });
  };

  const addFavoriteProduct = async (product) => {
    return await API.post(
      "/client/favorite-products",
      {
        product,
      },
      {
        secure: true,
      }
    );
  };

  const removeFavoriteProduct = async (product) => {
    return await API.delete("/client/favorite-products/" + product, {
      secure: true,
    });
  };

  return {
    getFavoriteProducts,
    addFavoriteProduct,
    removeFavoriteProduct,
  };
};

export default ClientFavoriteProductsRepository;
